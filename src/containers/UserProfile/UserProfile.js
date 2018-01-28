
// UserProfile.js

// React
import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import Button from 'material-ui/Button';

// Material UI
import Button from 'material-ui/Button';

// Components
import UserInfo from '../../components/Userinfo.js';

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user
    }

    this.handleSettings = this.handleSettings.bind(this);
  }

  componentDidMount() {

  }

  handleSettings(){
      this.props.handleSettings();
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
        <Button type = 'submit'><Link to="/settings" style={{ textDecoration: 'none', color: 'black' }}>Settings</Link></Button>
      </div>
    );
  }
}

export default UserProfile;
