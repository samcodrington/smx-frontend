
// UserProfile.js

import React, { Component } from 'react';

import UserApi from '../../api/UserApi.js'

class UserProfile extends Component {
  constructor(props) {
    super(props);
    console.log(props);
  }

  componentDidMount() {
   
  }

  render() {
    return (
      <div className='UserProfile'>
        <h1>
          Welcome to the User Profile Page
        </h1>
        <p> {this.props.user._id
          } 
        </p>
      </div>
    );
  }
}

export default UserProfile;