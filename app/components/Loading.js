import React, { Component } from 'react';
import PropTypes from 'prop-types';

var styles = {
	content: {
		textAlign: 'center',
		fontSize: '35px'
	}
}

class Loading extends Component {
	constructor(props){
		super(props);
		this.state = {
			text: props.text
		}
	}
	componentDidMount(){
		let stoper = this.props.text + '...';
		this.interval = window.setInterval(() => {
			if(this.state.text === stoper)
				this.setState(() => ({text: this.props.text}));
			else 
				this.setState((prevState) => ({text: prevState.text +'.'}));
		}, this.props.animationTime);
	}
	componentWillUnmount(){
		window.clearInterval(this.interval);
	}
	render() {
		return (
			<p style={styles.content}>
				{this.state.text}
			</p>
		);
	}
}

Loading.defaultProps = {
	text: 'Loading',
	animationTime: 300
}

Loading.propTypes = {
	text: PropTypes.string.isRequired,
	animationTime: PropTypes.number.isRequired
}

export default Loading;