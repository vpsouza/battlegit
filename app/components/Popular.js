import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Api  from '../utils/api';
import Loading from './Loading';

const Language = ({language,onSelect,selectedLanguage}) => (<li 
				style={language === selectedLanguage ? {color: '#d0021b'} : null}
				key={language}
				onClick={onSelect.bind(null, language)}>
				{language}
			</li>);

Language.PropTypes = {
	selectedLanguage: PropTypes.string.isRequired,
	onSelect: PropTypes.func.isRequired,
	language: PropTypes.string.isRequired
}

const SelectLanguage = props => {
		let languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];

		return (
			<ul className='languages'>
				{
					languages.map(lang => 
					<Language 
					 key={lang}
					 selectedLanguage = {props.selectedLanguage}
					 onSelect = {props.onSelect}
					 language={lang}/>)
				}
			</ul>
		);
} 

SelectLanguage.PropTypes = {
	selectedLanguage: PropTypes.string.isRequired,
	onSelect: PropTypes.func.isRequired
}

const Repo = ({repo,rank}) => (
	<li className='popular-item' key={repo.name}>
		<div className='popular-rank'>#{rank}</div>
		<ul className='space-list-items'>
			<li>
				<img 
					className='avatar'
					src={repo.owner.avatar_url}
					alt={'Avatar for ' + repo.owner.login}
				/>
			</li>
			<li>
				<a href={repo.html_url}>{repo.name}</a>
			</li>
			<li>@{repo.owner.login}</li>
			<li>{repo.stargazers_count} stars</li>
		</ul>
	</li>
);

const RepoGrid = ({repos}) => (
	<ul className='popular-list'>
		{repos.map((repo,index) => <Repo key={repo.name} rank={index + 1} repo={repo} />)}
	</ul>
);

RepoGrid.PropTypes = {
	repos: PropTypes.any.isRequired
}

class Popular extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			selectedLanguage: 'All',
			repos: null
		};
		
		this.updateLanguage = this.updateLanguage.bind(this);
	}

	componentDidMount(){
		this.updateLanguage(this.state.selectedLanguage);
	}

	updateLanguage(lang) {
		this.setState(() => ({
			selectedLanguage: lang,
			repos: null}));

		Api.fetchPopularRepos(lang).then((res) => this.setState({repos: res}));
	}

	render() {
		return (
			<div>
				<SelectLanguage
					selectedLanguage={this.state.selectedLanguage}
					onSelect={this.updateLanguage}
				/>
				{!this.state.repos ? <Loading /> : <RepoGrid repos={this.state.repos}/>}
			</div>
		);
	}
}

export default Popular;