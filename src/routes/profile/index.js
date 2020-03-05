import { h, Component } from 'preact';
import Button from 'preact-material-components/Button';
import LinearProgress from 'preact-material-components/LinearProgress';
import 'preact-material-components/Button/style.css';
import 'preact-material-components/LinearProgress/style.css';
import style from './style';

import { github } from '../../github.js';

export default class Profile extends Component {
	state = {
		loading: true,
		user: null,
	};

	constructor() {
		super();

		this.gh = github;
		this.fetchUser();
	}

	async fetchUser() {
		const user = await this.gh.users.getAuthenticated();

		this.setState({
			user: user,
			loading: false,
		});
	}

	render() {
		if(this.state.loading) {
			return (
				<div class={style.loader}>
					<LinearProgress indeterminate />
				</div>
			);
		}

		return (
			<div class={`${style.profile} page`}>
				<h1>Profile: {this.state.user.data.login}</h1>
				<p>This is the user profile for a user named { this.state.user.data.name }.</p>
				<p>coming soon</p>
			</div>
		);
	}
}
