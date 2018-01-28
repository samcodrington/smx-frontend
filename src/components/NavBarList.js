
// NavBarList.js

import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';

import AccountCircleIcon from 'material-ui-icons/AccountCircle';
import DraftsIcon from 'material-ui-icons/Drafts';

class NavBarList extends Component {
	constructor(props){
		super(props);
		this.triggerLogout = this.props.triggerLogout.bind(this);
	}

	render() {
		return(
			<div>
				<List>

	        <ListItem button component={Link} to="/PostTextbook">
	          <ListItemIcon>
	            <DraftsIcon />
	          </ListItemIcon>
	          <ListItemText primary="Post" />
	        </ListItem>

	        <ListItem button component={Link} to="/user">
	          <ListItemIcon>
	            <AccountCircleIcon />
	          </ListItemIcon>
	          <ListItemText primary="Profile" />
	        </ListItem>

	      </List>

	      <Divider />

	      <List>

	        <ListItem button component={Link} to="/settings">
	          <ListItemText primary="Settings" />
	        </ListItem>

					<ListItem button 
						onClick = {this.triggerLogout}
						>
	          <ListItemText primary="Log Out" />
	        </ListItem>

	      </List>
			</div>
		);
	}
}

export default NavBarList;