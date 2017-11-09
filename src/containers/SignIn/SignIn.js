 // SignIn.js


import React, { Component } from 'react';

import UserApi from '../../api/UserApi';

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const target = event.target;

    const name = target.name;
    const value = target.value;

    this.setState({[name]: value});
  }

  handleSubmit(event) {
    event.preventDefault();
    if(this.state.username === '' || this.state.password === '') {
      alert('Must have username and password');
    } else {
      const user = {
        username: this.state.username,
        password: this.state.password
      };
      const response = UserApi
        .createUser(
          user
        )
        .then((response) => {
          alert('You\'re signed in, ' + this.state.username);
          event.preventDefault();
        })
        .catch((response) => {
          alert('Something went wrong: ' + response.status);
        }
      );
    }
  }

  render() {
    return(
      <div>
        <h1>Sign In</h1>
        <form onSubmit={this.handleSubmit}>
          <label>
            Username: 
            <input name='username' type='text' value={this.state.username} onChange={this.handleChange} />
          </label>
          <br/>
          <label>
            Password: 
            <input name='password' type='password' value={this.state.password} onChange={this.handleChange} />
          </label>
          <br/>
          <input type='submit' value='Submit' />
        </form>
      </div>
    );
  }

}

export default SignIn;

/*
  Username
Password
Email
School
Listed Textbooks[]

*/