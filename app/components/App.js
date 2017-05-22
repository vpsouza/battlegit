import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Popular from './Popular';
import Home from './Home';
import Battle from './Battle';
import Results from './Results';
import Nav from './Nav';
import ReactRouter, {Route, BrowserRouter, Switch} from 'react-router-dom';

class App extends Component {
	render() {
		return (
			<BrowserRouter>
				<div className='containe'>
					<Nav />
					<Switch>
						<Route exact path='/' component={Home}/>
						<Route exact path='/battle' component={Battle}/>
						<Route path='/battle/results' component={Results}/>
						<Route path='/popular' component={Popular}/>
						<Route render={() => <p>Not Found</p>} />
					</Switch>
				</div>
			</BrowserRouter>
		)
	}
}

export default App;