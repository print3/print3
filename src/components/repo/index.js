import { h, Component } from 'preact';
import Card from 'preact-material-components/Card';
import LayoutGrid from 'preact-material-components/LayoutGrid';
import 'preact-material-components/Card/style.css';
import 'preact-material-components/LayoutGrid/style.css';
import style from './style';

export default class Repo extends Component {

  state = {
    url: '',
    photo: 'https://github.com/afflitto/Pixel_Rain/raw/master/Screenshots/face.png',
    title: 'repo-title',
    description: 'short repo description',
  }

  constructor({ url, title, description }) {
    super();
    this.state.url = url;
    this.state.title = title;
    this.state.description = description;
    this.state.photo = `${this.state.url}/raw/master/assets/cube.png`

    this.state.onClick = e => {
      e.preventDefault();

      window.location.href = this.state.url;
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
