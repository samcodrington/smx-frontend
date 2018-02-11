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

// Components
import CategoryForm from '../../components/postTextbook/CategoryForm';
import CollectionForm from '../../components/postTextbook/CollectionForm';
import TextbookForm from '../../components/postTextbook/TextbookForm';

// APIs
import TextbookApi from '../../api/TextbookApi';

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

	render() {
		return(
			<div>

			</div>
		);
	}
}

export default ManageTextbooks;

