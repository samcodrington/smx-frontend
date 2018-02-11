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
import UserApi from '../../api/UserbookApi';

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

	}

	handleQuery(userID) {
	  const response = UserApi.getOneTextbook(
	      userID)
	    .then((response) => {
	      //check if their are results
	      if (response != '-1') {
	        if(JSON.stringify(response[0]) != JSON.stringify(this.state.textbookResults)) {
	          this.setState({
	            textbookResults: response[0]//the first object returned is the textbook results
	            //ownerEmail: response[1],//the second object returned is the email of the owner
	            //thumbnail: response[2]//the third object returned is the thumbnail of the textbook
	          });
	        }
	      }
	      else {
	        if(this.state.textbookResults[0] != 'no results'){
	          this.setState({
	            textbookResults: ['no results']
	          });//current default message when no results returned
	        }
	      }
	    }).catch((response) => {
	        if(this.state.textbookResults[0] != 'error'){
	          this.setState({
	            textbookResults: ['error']
	          });
	        }
	  });
	  return response;
	}

	render() {
		return(
			<div>

			</div>
		);
	}
}

export default ManageTextbooks;

