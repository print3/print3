import { h, Component } from 'preact';
import Card from 'preact-material-components/Card';
import 'preact-material-components/Card/style.css';
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
    // this.state.url = url;
    //
    // this.state.title = title;
    // this.state.description = description;
    // console.log('url:', this.state.url)
  }

	render() {
		return (
			<div class={`${style.repo}`}>
				<Card>
          <img class={style.repo} src={this.state.photo}></img>
          <div class={style.cardBody}>
            <h2 class="mdc-typography--title">{this.state.title}</h2>
            {this.state.description}
          </div>



				</Card>
			</div>
		);
	}
}
