
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
		this.state = {
			isLoggedIn: this.props.isLoggedIn
		}
	}

	componentWillReceiveProps(nextProps){
    //Update isLoggedIn if it changes
    if (nextProps.isLoggedIn != this.props.isLoggedIn)
      this.setState({isLoggedIn: nextProps.isLoggedIn});
  }

	render() {
		let logoutButton = null;
		if (this.state.isLoggedIn){
			logoutButton =
				<ListItem button onClick = {this.triggerLogout}>
	        <ListItemText primary="Log Out" />
	      </ListItem>
		}
		return(
			<div>
				<List>

	        <ListItem button component={Link} to="/post-textbook">
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
					
				{logoutButton}
	      </List>
			</div>
		);
	}
}

export default NavBarList;