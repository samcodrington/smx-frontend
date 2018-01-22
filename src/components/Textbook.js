// Textbook.js

// React
import React, { Component } from 'react';
import { Redirect } from 'react-router';

// APIs
import TextbookApi from '../api/TextbookApi';
import logo from '../assets/images/book.png'

// Material UI
import Card, { CardHeader, CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import Paper from 'material-ui/Paper';

// Icons
import FavoriteIcon from 'material-ui-icons/Favorite';


const style = {
  media: {
  	height: 200
  },
  card: {
  	maxwidth: 200
  }
}

class Textbook extends Component {
	constructor(props) {
		super(props);

	}

	render() {
		return(
			<div>
				<Card style={ style.card }>
					<CardHeader 
						title={this.props.title}
						subheader="September 14, 2016"
						noWrap
					/>
	        <CardMedia 
	        	style={ style.media }
	          image={logo}
	          title="Contemplative Reptile"
	        />
	        <CardActions>
	        	<Button dense color="primary">
	        	  Share
	        	</Button>
	          <Button dense color="primary">
	            Learn More
	          </Button>
	        </CardActions>
	      </Card>
			</div>
		);
	}
}

//image="https://books.google.com/books/content?id=tCqI98qnVrcC&printsec=frontcover&img=1&zoom=0&edge=curl&source=gbs_api"
export default Textbook;
