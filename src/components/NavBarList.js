
// NavBarList.js

import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';

import AccountCircleIcon from 'material-ui-icons/AccountCircle';
import DraftsIcon from 'material-ui-icons/Drafts';

class NavBarList extends Component {

	render() {
		return(
			<div>
				<List>

	        <ListItem button component={Link} to="/sign-in">
	          <ListItemIcon>
	            <DraftsIcon />
	          </ListItemIcon>
	          <ListItemText primary="Post" />
	        </ListItem>

	        <ListItem button component={Link} to="/sign-in">
	          <ListItemIcon>
	            <AccountCircleIcon />
	          </ListItemIcon>
	          <ListItemText primary="Profile" />
	        </ListItem>

	      </List>

	      <Divider />

	      <List>

	        <ListItem button component={Link} to="/sign-in">
	          <ListItemText primary="Settings" />
	        </ListItem>

	        <ListItem button component={Link} to="/sign-in">
	          <ListItemText primary="Log Out" />
	        </ListItem>

	      </List>
			</div>
		);
	}
}

export default NavBarList;