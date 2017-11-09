
// SignUp.js

import React, { Component } from 'react';

import UserApi from '../../api/UserApi';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      confirm: ''
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
    if(this.state.password !== this.state.confirm) {
      alert('Passwords do not match!');
    } else if(this.state.password.length < 8) {
      alert('Password must be longer than 8 characters!');
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
          alert('You\'ve created an account! Name: ' + this.state.username);
          event.preventDefault();
        })
        .catch((response) => {
          console.log(response);
          alert('Something went wrong: ' + response.status);
        }
      );
    }
  }

  render() {
    return(
      <div>
      <h1>Sign Up</h1>
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
        <label>
          Confirm Password:
          <input name='confirm' type='password' value={this.state.confirm} onChange={this.handleChange} />
        </label>
        <br/>
        <input type='submit' value='Submit' />
      </form>
      </div>
    );
  }

}

export default SignUp;

/*
  Username
Password
Email
School
Listed Textbooks[]

*/
