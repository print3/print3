import { h, Component } from 'preact';
import { route } from 'preact-router';
import TopAppBar from 'preact-material-components/TopAppBar';
import Drawer from 'preact-material-components/Drawer';
import List from 'preact-material-components/List';
import Dialog from 'preact-material-components/Dialog';
import Switch from 'preact-material-components/Switch';
import TextField from 'preact-material-components/TextField';
import CollapsibleSearchBar from '../collapsibleSearchBar';
import 'preact-material-components/Switch/style.css';
import 'preact-material-components/Dialog/style.css';
import 'preact-material-components/Drawer/style.css';
import 'preact-material-components/List/style.css';
import 'preact-material-components/TopAppBar/style.css';
import 'preact-material-components/TextField/style.css';
import style from './style';

export default class Header extends Component {
	closeDrawer() {
		this.drawer.MDComponent.open = false;
		this.state = {
			darkThemeEnabled: false
		};
	}

	openDrawer = () => (this.drawer.MDComponent.open = true);

	openSettings = () => this.dialog.MDComponent.show();

	drawerRef = drawer => (this.drawer = drawer);
	dialogRef = dialog => (this.dialog = dialog);

	linkTo = path => () => {
		route(path);
		this.closeDrawer();
	};

	goHome = this.linkTo('/');
	goToMyProfile = this.linkTo('/profile');
	logIntoGithub = () => {
		const randState = Math.floor(Math.random()*Math.pow(2, 48)).toString(16);
		const now = new Date().getTime();
		const storeState = JSON.stringify({
			state: randState,
			time: now
		});
		window.localStorage.setItem('state', storeState);

		const oauth = {
			client_id: '83429a3e04fdaf219e32',
			redirect_uri: 'https://www.print3.org/callback',
			scope: 'public_repo, read:user',
			state: randState,
		}

		window.location.href = `https://github.com/login/oauth/authorize?
			client_id=${oauth.client_id}&
			redirect_uri=${oauth.redirect_uri}&
			scope=${oauth.scope}&
			state=${oauth.state}
		`;
	};

	toggleDarkTheme = () => {
		this.setState(
			{
				darkThemeEnabled: !this.state.darkThemeEnabled
			},
			() => {
				if (this.state.darkThemeEnabled) {
					document.body.classList.add('mdc-theme--dark');
				}
				else {
					document.body.classList.remove('mdc-theme--dark');
				}
			}
		);
	}

	render(props) {
		console.log(props.selectedRoute);
		return (
			<div>
				<TopAppBar className="topappbar">
					<TopAppBar.Row>
						<TopAppBar.Section align-start>
							<TopAppBar.Icon menu onClick={this.openDrawer}>
								menu
							</TopAppBar.Icon>
							<TopAppBar.Title class={style.title}>print^3</TopAppBar.Title>
						</TopAppBar.Section>
						<TopAppBar.Section align-end>
							<CollapsibleSearchBar />
						</TopAppBar.Section>
					</TopAppBar.Row>
				</TopAppBar>
				<Drawer modal ref={this.drawerRef}>
					<Drawer.DrawerContent>
						<Drawer.DrawerItem selected={props.selectedRoute === '/'} onClick={this.goHome}>
							<List.ItemGraphic>home</List.ItemGraphic>
							Home
						</Drawer.DrawerItem>
						<Drawer.DrawerItem selected={props.selectedRoute === '/profile'} onClick={this.goToMyProfile}>
							<List.ItemGraphic>account_circle</List.ItemGraphic>
							Profile
						</Drawer.DrawerItem>
						<Drawer.DrawerItem onClick={this.logIntoGithub}>
							<List.ItemGraphic>account_circle</List.ItemGraphic>
							Github
						</Drawer.DrawerItem>
					</Drawer.DrawerContent>
				</Drawer>
				<Dialog ref={this.dialogRef}>
					<Dialog.Header>Settings</Dialog.Header>
					<Dialog.Body>
						<div>
							Enable dark theme <Switch onClick={this.toggleDarkTheme} />
						</div>
					</Dialog.Body>
					<Dialog.Footer>
						<Dialog.FooterButton accept>OK</Dialog.FooterButton>
					</Dialog.Footer>
				</Dialog>
			</div>
		);
	}
}
