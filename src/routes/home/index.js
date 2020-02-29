import { h, Component } from 'preact';
import Card from 'preact-material-components/Card';
import LayoutGrid from 'preact-material-components/LayoutGrid';
import LinearProgress from 'preact-material-components/LinearProgress';
import 'preact-material-components/Card/style.css';
import 'preact-material-components/Button/style.css';
import 'preact-material-components/LayoutGrid/style.css';
import 'preact-material-components/LinearProgress/style.css';
import style from './style';

import { Octokit } from '@octokit/rest'

import Repo from '../../components/repo';

export default class Home extends Component {
	state = {
		loading: true
	}

	constructor() {
		super();

		const token = window.localStorage.getItem('token');

		if(token) {
			this.gh = new Octokit({
				auth: token
			});

			console.log(this.gh)

			this.fetchRepos();
		} else {
			console.log('go to log in')
		}
	}

	async fetchRepos() {
		const response = await this.gh.search.repos({
			q: 'topic:print3-model',
			sort: 'stars',
			per_page: 30
		});

		const repos = response.data.items;

		console.log(repos)

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

		return (
			<div class={`${style.home} page`}>
				<LayoutGrid>
					<LayoutGrid.Inner>
						{repos}
					</LayoutGrid.Inner>
				</LayoutGrid>
			</div>
		);
	}
}
