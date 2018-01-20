
// UserProfile.js

import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Button from 'material-ui/Button';


import UserInfo from '../../components/Userinfo.js';
class UserProfile extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      user: this.props.user
    }
  }

  componentDidMount() {
    
  }

  handleEditProfile(){
    
  }

  render() {
    return (
      <div className='UserInfo'>
        <h1> User Profile </h1>
        <UserInfo user = {this.state.user}/>
        <Button type = 'submit' onClick = {this.handleEditProfile}> Edit Info </Button>
      </div>
    );
  }
}

export default UserProfile;