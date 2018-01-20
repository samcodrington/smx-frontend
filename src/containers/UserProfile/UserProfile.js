
// UserProfile.js

import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import UserInfo from '../../components/Userinfo.js';
class UserProfile extends Component {
  constructor(props) {
    super(props);
    console.log(props);
  }

  componentDidMount() {
  
  }

  render() {
    return (
      <div className='UserInfo'>
        <UserInfo />
      </div>
    );
  }
}

export default UserProfile;