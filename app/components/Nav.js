import React, { Component } from 'react';
import ReactRouter, {NavLink} from 'react-router-dom';

class Nav extends Component {
	render() {
		return (
			<ul className='nav'>
				<li>
					<NavLink exact activeClassName='active' to='/'>Home</NavLink>
				</li>
				<li>
					<NavLink activeClassName='active' to='/battle'>Battle</NavLink>
				</li>
				<li>
					<NavLink activeClassName='active' to='/popular'>Popular</NavLink>
				</li>
			</ul>
		);
	}
}

export default Nav;