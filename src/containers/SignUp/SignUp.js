
// SignUp.js

import React, { Component } from 'react';

import Grid from 'material-ui/Grid';

import SignUpForm from '../../components/SignUpForm';
import SignUpInfoForm from '../../components/SignUpInfoForm';

class SignUp extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div>
        <Grid container spacing={8} alignContent={'center'} alignItems={'center'} justify={'center'}>
          <Grid item xs={12} md={6}>
            <SignUpForm />
          </Grid>
        </Grid>
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
