
// SignUp.js

import React, { Component } from 'react';
import { Redirect } from 'react-router';

import Grid from 'material-ui/Grid';

import SignUpForm from '../../components/SignUpForm';
import SignUpInfoForm from '../../components/SignUpInfoForm';

import authApi from '../../api/AuthApi';


class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      createdUser: false,
      userID: '',
      username: '',
      password: ''
    };

    this.submissionSuccess = this.submissionSuccess.bind(this);
    this.accountCreationSuccess = this.accountCreationSuccess.bind(this);
  }
  //function triggered when SignUpForm filled in correctly
  //displays to the user the SignUpInfoForm
  submissionSuccess(userID,username,password){
    this.setState({
      createdUser: true,
      userID: userID,
      username: username,
      password: password
    });
  }
  //function triggered when SignUpInfoForm filled in correctly
  //redirects the user to there profile page
  accountCreationSuccess(){
    const user = {
        username: this.state.username,
        password: this.state.password
      };
      const response = authApi
        .login(
          user.username, user.password
        )
        .then((response) => {
          //alert('You\'re signed in, ' + this.state.username);
          console.log("Headers: " + JSON.stringify(response.headers));
          this.props.addUserInfo(response);
          this.props.changeLoginStatus(true);  //triggers a component change from app.js
        })
        .catch((response) => {
          console.log(response);
          alert('Something went wrong: ' + response.status);
        }
      );
    //trigger login attempt here
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

export default SignUp;

/*
  Username
Password
Email
School
Listed Textbooks[]

*/
