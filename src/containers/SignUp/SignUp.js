
// SignUp.js

import React, { Component } from 'react';
import { Redirect } from 'react-router';

import Grid from 'material-ui/Grid';

import SignUpForm from '../../components/SignUpForm';
import SignUpInfoForm from '../../components/SignUpInfoForm';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      createdUser: false,
      redirect: false,
      userID: ""
    };

    this.submissionSuccess = this.submissionSuccess.bind(this);
    this.accountCreationSuccess = this.accountCreationSuccess.bind(this);
  }
  //function triggered when SignUpForm filled in correctly
  //displays to the user the SignUpInfoForm
  submissionSuccess(userID){
    this.setState({
      createdUser: true,
      userID: userID
    });
  }
  //function triggered when SignUpInfoForm filled in correctly
  //redirects the user to there profile page
  accountCreationSuccess(){
    this.setState({
      redirect: true
    });
  }

  render() {
    var informationForm;
      if (!this.state.createdUser)
        informationForm = <SignUpForm
          submissionSuccess = {this.submissionSuccess}
        />;
      else
        informationForm = <SignUpInfoForm
          userID = {this.state.userID}
          accountCreationSuccess = {this.accountCreationSuccess}
        />;
    if (this.state.redirect){
      return (<Redirect push to='/user' />);
    } else {
    return(
      <div>
        <Grid container spacing={8} alignContent={'center'} alignItems={'center'} justify={'center'}>
          <Grid item xs={12} md={6}>
            {informationForm}
          </Grid>
        </Grid>
      </div>
    );
    }
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
