// Textbook.js

// React
import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';

// APIs
import TextbookApi from '../api/TextbookApi';
import book from '../assets/images/book.png';

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
  },
  header: {
  	height: 100
  },
  link: {
  	'text-decoration':'none'
  }
}

class Textbook extends Component {
	constructor(props) {
		super(props);
		this.state = {
			deleted: false
		}
		this.deletePost = this.deletePost.bind(this);
	}

	createEmailLink(props) {
		const author = props.author;
		const link = "https://" + window.location.host + props.url;
		const subject = "Look what I found on QTextbook";
		const body = "Check out this textbook I found on QTextbook: "+ link;
		var emailLink = "mailto:?to=&body="+ body +",&subject=" + subject;
		return emailLink;
	}

	deletePost() {
		var textbookID = this.props.url.substring(10);
		this.handleDelete(textbookID);
	}

	handleDelete(textbookID) {
	  const response = TextbookApi.deleteUserTextbook(
	      textbookID)
	    .then((response) => {
	      //check if their are results
	      console.log(response);
	      if (response != '-1') {
	      	this.setState({deleted: true});
	      }
	      else {
	        alert("Failed to delete textbook");
	      }
	    }).catch((response) => {
	        alert("Failed to communicate with server");
	  });
	  return response;
	}

	render() {
		if(this.state.deleted === true) {
			return(<div></div>);
		}

		var deleteButton;
		if(this.props.delete === true) {
			deleteButton = 
		        	<Button dense color="primary" onClick={ () => this.deletePost() } >
		        	  Delete Post
		        	</Button>
		}
		return(
			<div>
				<Card style={ style.card }>
					<CardHeader 
						title={this.props.title}
						subheader={this.props.author}
						noWrap
						style={ style.header }
					/>
	        <CardMedia 
	        	style={ style.media }
	          image={book}
	          title="Cover Art"
	        />
	        <CardActions>
	        	<a href={ this.createEmailLink(this.props) } style={ style.link }>
		        	<Button dense color="primary" >
		        	  Share
		        	</Button>
	        	</a>
	          <Button dense color="primary" component={Link} to={ this.props.url }>
	            Learn More
	          </Button>

	          {deleteButton}

	        </CardActions>
	      </Card>
			</div>
		);
	}
}

//image="https://books.google.com/books/content?id=tCqI98qnVrcC&printsec=frontcover&img=1&zoom=0&edge=curl&source=gbs_api"
export default Textbook;
