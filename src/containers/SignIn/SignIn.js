// SignIn.js

import React, { Component } from 'react';

import Grid from 'material-ui/Grid';

import SignInForm from '../../components/SignInForm';

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.changeLoginStatus = this.props.changeLoginStatus.bind(this);
  }

  render() {
    return(
      <div>
        <Grid container spacing={8} alignContent={'center'} alignItems={'center'} justify={'center'}>
          <Grid item xs={12} md={6}>
            <SignInForm changeLoginStatus = {this.changeLoginStatus} />
          </Grid>
        </Grid>
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