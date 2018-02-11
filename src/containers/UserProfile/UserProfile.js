
// UserProfile.js

// React
import React, { Component } from 'react';

// Components
import UserInfo from '../../components/Userinfo.js';

class UserProfile extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let userInfo = {
      nameFirst: this.props.user.nameFirst,
      nameLast: this.props.user.nameLast,
      email: this.props.user.email,
      school: this.props.user.school
    }
    return (
      <div className='UserInfo'>
        <UserInfo user = {userInfo}/>
      </div>
    );
  }
}

export default UserProfile;
