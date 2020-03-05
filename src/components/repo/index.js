import { h, Component } from 'preact';
import Card from 'preact-material-components/Card';
import LayoutGrid from 'preact-material-components/LayoutGrid';
import 'preact-material-components/Card/style.css';
import 'preact-material-components/LayoutGrid/style.css';
import style from './style';

import { github } from '../../github.js';

export default class Repo extends Component {
  constructor({ url, title, description, owner, repo }) {
    super();

    this.gh = github;

    this.state.url = url;
    this.state.title = title;
    this.state.description = description;
    this.state.owner = owner;
    this.state.repo = repo;

    this.fetchManifest();

    this.state.onClick = e => {
      e.preventDefault();

      window.location.href = this.state.url;
    }
  }

  async fetchManifest() {
    try {
      const response = await this.gh.repos.getContents({
        owner: this.state.owner,
        repo: this.state.repo,
        path: 'manifest.json',
      });

      const manifest = atob(response.data.content);
      const photoURL = JSON.parse(manifest).coverPhoto;

      this.setState({
        photo: this.state.url + '/raw/master' + photoURL
      });
    } catch(err) {
      console.error(err);
    }
  }

	render() {
		return (
      <LayoutGrid.Cell desktopCols="4" phoneCols="12">
  			<div class={`${style.repo}`} onClick={this.state.onClick}>
  				<Card>
            <img class={style.repo} src={this.state.photo}></img>
            <div class={style.cardBody}>
              <h2 class="mdc-typography--title">{this.state.title}</h2>
              {this.state.description}
            </div>
  				</Card>
  			</div>
      </LayoutGrid.Cell>
		);
	}
}
