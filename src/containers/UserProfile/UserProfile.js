
// UserProfile.js

import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Button from 'material-ui/Button';


import UserInfo from '../../components/Userinfo.js';
class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user
    }
  }

  componentDidMount() {
    
  }

  handleEditProfile(){

  }

  render() {
    let userInfo = {
      nameFirst: this.state.user.nameFirst,
      nameLast: this.state.user.nameLast,
      email: this.state.user.email,
      school: this.state.user.school
    }
    return (
      <div className='UserInfo'>
        <h1> User Profile </h1>
        <UserInfo user = {userInfo}/>
        <Button type = 'submit' onClick = {this.handleEditProfile}> Edit Info </Button>
      </div>
    );
  }
}

export default UserProfile;