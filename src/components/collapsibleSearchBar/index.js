import { h, Component } from 'preact';
import IconButton from 'preact-material-components/IconButton';
import TextField from 'preact-material-components/TextField';
import 'preact-material-components/IconButton/style.css';
import 'preact-material-components/TextField/style.css'
import style from './style';

export default class CollapsibleSearchBar extends Component {
  state = {
    collapsed: true
  }

  open = () => {
    this.setState({
      collapsed: false
    });
  }

  close = () => {
    this.setState({
      collapsed: true
    });
  }

  onKeyDown = e => {
    if(e.key === 'Enter') {
      this.close();
      window.location = `/search/${this.state.query}`;
    }
  }

  render() {
    if(this.state.collapsed) {
      return (
        <IconButton>
          <IconButton.Icon onClick={this.open}>search</IconButton.Icon>
        </IconButton>
      )
    } else {
      return (
        <TextField
          autoFocus
          label='Search'
          class={style.search}
          onKeyDown={this.onKeyDown}
          onInput={e => this.setState({ query: e.target.value })}
          onBlur={this.close}
        />
      )
    }
  }
}
