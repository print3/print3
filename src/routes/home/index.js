import { h, Component } from 'preact';
import Card from 'preact-material-components/Card';
import LayoutGrid from 'preact-material-components/LayoutGrid';
import 'preact-material-components/Card/style.css';
import 'preact-material-components/Button/style.css';
import 'preact-material-components/LayoutGrid/style.css';
import style from './style';

export default class Home extends Component {
	render() {

		const card = (
			<LayoutGrid.Cell desktopCols="4" tabletCols="6" phoneCols="12">
				<Card>
					<div class={style.cardHeader}>
						<h2 class=" mdc-typography--title">Home card</h2>
						<div class=" mdc-typography--caption">Welcome to home route</div>
					</div>
					<div class={style.cardBody}>
						Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
					</div>
					<Card.Actions>
						<Card.ActionButton>OKAY</Card.ActionButton>
					</Card.Actions>
				</Card>
			</LayoutGrid.Cell>
		)

		const cards = Array(6).fill(card);

		console.log(cards)

		return (
			<div class={`${style.home} page`}>
				<h1>print^3</h1>
				<LayoutGrid>
					<LayoutGrid.Inner>
						{cards}
					</LayoutGrid.Inner>
				</LayoutGrid>
			</div>
		);
	}
}
