
// SignUp.js

import React, { Component } from 'react';

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
    alert('You\'ve created an account! Name: ' + this.state.username);
    event.preventDefault();
  }

  render() {
    return(
      <form onSubmit={this.handleSubmit}>
        <label>
          Username:
          <input name='username' type='text' value={this.state.username} onChange={this.handleChange} />
        </label>
        <label>
          Password:
          <input name='password' type='password' value={this.state.password} onChange={this.handleChange} />
        </label>
        <label>
          Confirm Password:
          <input name='confirm' type='password' value={this.state.confirm} onChange={this.handleChange} />
        </label>
        <input type='submit' value='Submit' />
      </form>
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