import { h, Component } from 'preact';
import { Router } from 'preact-router';

import 'preact-material-components/Theme/style.css';

import Header from './header';
import Home from '../routes/home';
import Profile from '../routes/profile';
import NotFound from '../routes/404';
// import Home from 'async!../routes/home';
// import Profile from 'async!../routes/profile';

export default class App extends Component {
	/** Gets fired when the route changes.
	 *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
	 *	@param {string} event.url	The newly routed URL
	 */
	handleRoute = e => {
		this.setState({
			currentUrl: e.url
		});
	};

	theme = null

	render() {
		return (
			<div id="app">
				<Header selectedRoute={this.state.currentUrl} />
				<Router onChange={this.handleRoute}>
					<Home path="/" />
					<Home path="/user/:user" />
					<Home path="/search/:searchQuery" />
					<Home path="/callback/:params?" />
					<Profile path="/profile/" user="me" />
					<Profile path="/profile/:user" />
					<NotFound default />
				</Router>
			</div>
		);
	}
}
