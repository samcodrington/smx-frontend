
// UserProfile.js

import React, { Component } from 'react';

import UserApi from '../../api/UserApi.js'

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: ''
    };
    console.log(props);
  }

  componentDidMount() {
    var self = this;
    const resp = UserApi
      .get('api')
      .then((response) => {
        console.log(response.results[0]);
        var result = response.results[0];

        self.setState({
          name: result.name.first,
          email: result.email
        });
      })
      .catch((response) => {
        console.log(response);
        return response;
      });
  }

  render() {
    return (
      <div className='UserProfile'>
        <h1>
          {this.state.name}
        </h1>
        <p> {this.state.email} </p>
      </div>
    );
  }
}

export default UserProfile;