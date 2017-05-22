import React, { Component } from 'react';
import ReactRouter, {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import PlayerPreview from './PlayerPreview';

class PlayerInput extends Component {
	constructor(props){
		super(props);
		this.state = {
			userName: ''
		}
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	handleChange(event){
		let value = event.target.value;
		this.setState(() => ({userName: value}));
	}
	handleSubmit(event){
		event.preventDefault();
		this.props.onSubmit(
			this.props.id,
			this.state.userName);
	}
	render(){
		return (
			<form className='column' onSubmit={this.handleSubmit}>
				<label className='header' htmlFor='userName'>{this.props.label}</label>
				<input
					id='username'
					placeholder='Github username'
					type='text'
					autoComplete='off'
					value={this.state.userName}
					onChange={this.handleChange}/>
				<button 
					className='button'
					type='submit'
					disabled={!this.state.userName}>
					Submit
				</button>
			</form>
		);
	}
}

PlayerInput.propTypes = {
	id: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	onSubmit: PropTypes.func.isRequired
}

class Battle extends Component {
	constructor(props){
		super(props);
		this.state = {
			playerOneName: '',
			playerOneImage: null,
			playerTwoName: '',
			playerTwoImage: null
		}

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleReset = this.handleReset.bind(this);
	}
	handleSubmit(id, userName){
		this.setState(() => ({
			[id + 'Name']: userName,
			[id + 'Image']: 'https://github.com/'+ userName + '.png?size=200'
		}));
	}
	handleReset(id){
		this.setState(() => ({
			[id + 'Name']: '',
			[id + 'Image']: null
		}));
	}
	render() {
		let match = this.props.match;

		let playerOneName = this.state.playerOneName;
		let playerOneImage = this.state.playerOneImage;
		let playerTwoName = this.state.playerTwoName;
		let playerTwoImage = this.state.playerTwoImage;

		return (
			<div>
				<div className='row'>
					{!playerOneName && 
						<PlayerInput 
							id='playerOne'
							label='Player One'
							onSubmit={this.handleSubmit}/>}
					
					{playerOneImage !== null && 
						<PlayerPreview 
							id='playerOne'
							avatar={playerOneImage}
							userName={playerOneName}>
							<button 
								className='reset'
								onClick={this.handleReset.bind(null,'playerOne')}>
								Reset
							</button>
						</PlayerPreview>}

					{!playerTwoName && 
						<PlayerInput 
							id='playerTwo'
							label='Player Two'
							onSubmit={this.handleSubmit}/>}
					
					{playerTwoImage !== null && 
						<PlayerPreview 
							id='playerTwo'
							avatar={playerTwoImage}
							userName={playerTwoName}>
							<button 
								className='reset'
								onClick={this.handleReset.bind(null,'playerTwo')}>
								Reset
							</button>	
						</PlayerPreview>}
				</div>

				{playerOneImage !== null && 
						playerTwoImage !== null && 
						<Link 
							className='button' 
							to={{
								pathname: match.url + '/results',
								search: '?playerOneName=' + playerOneName
									+ '&playerTwoName=' + playerTwoName
							}}>Battle</Link>}
			</div>
		);
	}
}

export default Battle;