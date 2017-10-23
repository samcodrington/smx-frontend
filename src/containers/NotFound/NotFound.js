
// NotFound.js

import React, { Component } from 'react';

import UserApi from '../../api/UserApi.js'

class NotFound extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: ''
    };
    console.log(props);
  }

  componentDidMount() {
    var self = this;
    const resp = UserApi
      .get('api')
      .then((response) => {
        console.log(response.results[0]);
        self.setState({
          userData: response.results[0].gender
        });
      })
      .catch((response) => {
        console.log(response);
        return response;
      });
  }

  render() {
    return (
      <div className='NotFound'>
        <h1>
          404 <small>Not Found :(</small>
        </h1>
        <p> {this.state.userData} </p>
      </div>
    );
  }
}

export default NotFound;