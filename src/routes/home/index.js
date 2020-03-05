import { h, Component } from 'preact';
import Card from 'preact-material-components/Card';
import LayoutGrid from 'preact-material-components/LayoutGrid';
import LinearProgress from 'preact-material-components/LinearProgress';
import Icon from 'preact-material-components/Icon';
import IconButton from 'preact-material-components/IconButton';

import 'preact-material-components/Card/style.css';
import 'preact-material-components/Button/style.css';
import 'preact-material-components/LayoutGrid/style.css';
import 'preact-material-components/LinearProgress/style.css';
import 'preact-material-components/Icon/style.css';
import 'preact-material-components/IconButton/style.css';

import style from './style';

import { Octokit } from '@octokit/rest'

import Repo from '../../components/repo';

export default class Home extends Component {
	state = {
		loading: true
	}

	constructor(props) {
		super();

		const token = window.localStorage.getItem('token');

		if(token) {
			this.gh = new Octokit({
				auth: token
			});

			console.log(this.gh)

			this.fetchRepos(props);
		} else {
			console.log('go to log in')
		}

		if(props.code && props.state) {
			//check state matches
			const expectedStateJSON = window.localStorage.getItem('state');
			if(expectedStateJSON) {
				const expectedState = JSON.parse(expectedStateJSON).state;
				if(expectedState === props.state) {
					this.fetchAuthToken(props.code, props.state);
				} else {
					console.error('state mismatch!')
				}
			} else {
				console.error('no state saved!')
			}
		}
	}

	async fetchAuthToken(code, state) {
		console.log(code, state);

		const authJson = await fetch(
			'https://3p2fxbq423.execute-api.us-east-1.amazonaws.com/dev/auth', {
				method: 'POST',
				body: JSON.stringify({ code, state })
			}
		);

		const auth = await authJson.json();
		console.log(auth);

		// TODO: put error in a dialog
		// <Dialog ref={this.dialogRef}>
		// 	<Dialog.Header>Settings</Dialog.Header>
		// 	<Dialog.Body>
		// 		<div>
		// 			Enable dark theme <Switch onClick={this.toggleDarkTheme} />
		// 		</div>
		// 	</Dialog.Body>
		// 	<Dialog.Footer>
		// 		<Dialog.FooterButton accept>OK</Dialog.FooterButton>
		// 	</Dialog.Footer>
		// </Dialog>

		if(auth.error) {
			console.log(auth.error, auth.error_description);
		} else if(auth.access_token) {
			window.localStorage.setItem('token', auth.access_token);
			window.localStorage.setItem('state', null);
			window.location.href = '/';
		}
	}

	async fetchRepos({ user, searchQuery }) {
		let query = 'topic:print3-model';
		if(user) {
			query += ` user:${user}`;
		} else if(searchQuery) {
			query += ' ' + searchQuery;
		}

		const response = await this.gh.search.repos({
			q: query,
			sort: 'stars',
			per_page: 30
		});

		const repos = response.data.items;

		this.setState({
			repos: repos,
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

		const repos = this.state.repos.map(repo => (
			<Repo
				url={repo.html_url}
				title={repo.full_name}
				description={repo.description}
				owner={repo.owner.login}
				repo={repo.name}
			/> )
		);

		let header;
		const backHome = (
			<IconButton class={style.backButton} onClick={()=>{window.location="/"}}>
				<IconButton.Icon>arrow_back</IconButton.Icon>
				<span>Back</span>
			</IconButton>
		)

		if(this.props.user) {
			header = <div><h1>User: {this.props.user}</h1> {backHome}</div>
		} else if(this.props.searchQuery) {
			header = <div><h1>Search: {this.props.searchQuery}</h1> {backHome}</div>
		} else {
			header = <h1>Home</h1>
		}


		return (
			<div class={`${style.home} page`}>
				{header}
				<LayoutGrid>
					<LayoutGrid.Inner>
						{repos}
					</LayoutGrid.Inner>
				</LayoutGrid>
			</div>
		);
	}
}
