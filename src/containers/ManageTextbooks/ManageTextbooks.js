// ManageTextbooks.js

// React
import React, { Component } from 'react';

// Material UI
import Grid from 'material-ui/Grid';
import { withTheme } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';
import Tabs, { Tab } from 'material-ui/Tabs';
import AppBar from 'material-ui/AppBar';

// APIs
import TextbookApi from '../../api/TextbookApi';
import UserApi from '../../api/UserApi';

// Components
import Textbook from '../../components/Textbook';

const styles = {
  paperContainer: {
    height: '70vh',
    margin: 'auto',
    width: '80%',
    'z-index': 50
  },
  infoContainer: {
    'padding': 20
  }
}

class ManageTextbooks extends Component {
	constructor(props) {
		super(props);
		this.state = {
			textbookResults: []
		};
	}

	handleQuery(userID) {
	  const response = UserApi.getUserPostedTextbook(
	      userID)
	    .then((response) => {
	      //check if their are results
	      if (response != '-1') {
	      	console.log(response);
	        if(JSON.stringify(response) != JSON.stringify(this.state.textbookResults)) {
	          this.setState({
	            textbookResults: response//the first object returned is the textbook results
	            //ownerEmail: response[1],//the second object returned is the email of the owner
	            //thumbnail: response[2]//the third object returned is the thumbnail of the textbook
	          });
	        }
	      }
	      else {
	        if(this.state.textbookResults != 'no results'){
	          this.setState({
	            textbookResults: 'no results'
	          });//current default message when no results returned
	        }
	      }
	    }).catch((response) => {
	        if(this.state.textbookResults != 'error'){
	          this.setState({
	            textbookResults: 'error'
	          });
	        }
	  });
	  return response;
	}

	handleQuerySuccess(query) {
    var bookList = []
    var books = this.state.textbookResults;
    var lengthBooks = books.length;

    // props for textbook component
    var bookTitle;
    var bookAuthor;
    var bookID;

    //limit results
    /*
    if(lengthBooks > 12) {
      lengthBooks = 12;
    }
    */

    for(var i=0; i < lengthBooks; i++) {
      console.log(books[i])

      // book title formatting (check for length)
      bookTitle = books[i].title
      if(bookTitle.length > 40) {
        bookTitle = bookTitle.substr(0,40) + "...";
      }

      bookAuthor = books[i].author;
      bookID = "/textbook/" + books[i]._id;

      
      bookList.push(
        <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
          <Textbook title={ bookTitle } author={ bookAuthor } url={ bookID } delete={true}/>
        </Grid>
      );
    }

    return(
      <div className='Manage'>
        <Grid container>
          <Grid item sm={12} md={12} lg={12} xl={12}>
            <Typography type={'display1'}>Manage your posts:</Typography>
          </Grid>
          {bookList}
        </Grid>
      </div>
    );
  }

  handleQueryFail() {
    return(
      <div>
        <Typography component='h2'>Could not communicate with server</Typography>
      </div>
    );
  }

  handleNoResults() {
    return(
      <div>
        <Typography component='h2'>No Results</Typography>
      </div>
    );
  }

  render() {
  	if(this.props.user != null) {
  		var uID = this.props.user["_id"];
  		this.handleQuery(uID);
  		
  		// handle no results
  		if(this.state.textbookResults === 'no results') {
  		  return(
  		    this.handleNoResults()
  		  );
  		// handle query failure
  		} else if(this.state.textbookResults === 'error') {
  		  return(
  		    this.handleQueryFail()
  		  );
  		} else {
  		  return(
  		    this.handleQuerySuccess(uID)
  		  );
  		}
  	} else {
  		return(
  		  this.handleQueryFail()
  		);
  	}
  }
}
export default ManageTextbooks;

