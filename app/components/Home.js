import React, { Component } from 'react';
import ReactRouter, {Link} from 'react-router-dom';

class Home extends Component {
	render() {
		return (
			<div className='home-container'>
				<h1>GitHub Battle : Battle your friends</h1>
				<Link className='button' to='/battle'>Battle</Link>
			</div>
		);
	}
}

export default Home;