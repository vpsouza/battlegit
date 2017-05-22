import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Api  from '../utils/api';
import queryString from 'query-string';
import ReactRouter, {Link} from 'react-router-dom';
import PlayerPreview from './PlayerPreview';
import Loading from './Loading';

const Player = ({label, score, profile}) => (
	<div>
		<h1 className='header'>{label}</h1>
		<h3 style={{textAlign:'center'}}>Score: {score}</h3>
		<PlayerPreview
			avatar={profile.avatar_url}
			userName={profile.login}>
			<ul className='space-list-items'>
				{profile.name && <li>{profile.name}</li>}
				{profile.location && <li>{profile.location}</li>}
				{profile.company && <li>{profile.company}</li>}
				<li>Followers: {profile.followers}</li>
				<li>Following: {profile.following}</li>
				<li>Public Repos: {profile.public_repos}</li>
				{profile.blog && <li><a href={profile.blog}>{profile.blog}</a></li>}
			</ul>
		</PlayerPreview>
	</div>
);

Player.propTypes = {
	label: PropTypes.string.isRequired,
	score: PropTypes.number.isRequired,
	profile: PropTypes.object.isRequired
}

class Results extends Component {

	constructor(props){
		super(props);
		this.state = {
			winner: null,
			loser: null,
			error: null,
			loading: true
		};
	}
	
	componentDidMount(){
		let players = queryString.parse(this.props.location.search);
		Api.battle([players.playerOneName, players.playerTwoName])
			.then(results => {
				if(results === null){
					return this.setState(() => ({
						error: 'Looks like there was an error. Check both user exists on Github.',
						loading: false
					}));
				}

				this.setState(() => ({
					winner: results[0],
					loser: results[1],
					loading: false,
					error: null
				}))
			});
	}

	render() {
		let error = this.state.error;
		let winner = this.state.winner;
		let loser = this.state.loser;
		let loading = this.state.loading;

		if(loading === true)
			return <Loading />;

		if(error)
			return (
				<div>
					<p>{error}</p>
					<Link className='button' to='/battle'>Reset</Link>
				</div>
			);

		return (
			<div className='row'>
				<Player
					label='Winner'
					score={winner.score}
					profile={winner.profile}/>

				<Player
					label='Loser'
					score={loser.score}
					profile={loser.profile}/>
			</div>
		);
	}
}

export default Results;