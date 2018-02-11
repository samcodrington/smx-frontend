// SignUpForm.js

import React, { Component } from 'react';

import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';

import UserApi from '../api/UserApi';

const style = {
  paper: {
    textAlign: 'center',
    padding: 20
  },
  button: {
    marginTop: 10
  }
}

class SignUpInfoForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nameFirst: '',
      nameLast: '',
      email: '',
      school: '',
      nameFirstError: false,
      nameLastError: false,
      emailError: false,
      schoolError: false,
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

  //returns a 0 if email is valid
  ensureEmailValid = function(email){
    //string is valid if it is in the form string@string.string
    var at = email.indexOf("@");
    var atLast = email.lastIndexOf("@");
    var periodLast = email.lastIndexOf(".");
    //ensure only one occurence of @ sign
    //ensure a period (for web domain occcurs after @ sign)
    if (at == atLast && periodLast > atLast){
      return 0;
    }
    else {
      return 1;
    }
  };

  handleSubmit(event) {
    event.preventDefault();
    var error = false;
    //check to ensure information is filled in
    if (this.state.nameFirst==""){
      this.setState({nameFirstError: true});
      error = true;
    } else {this.setState({nameFirstError: false});}
    if (this.state.nameLast==""){
      error = true;
      this.setState({nameLastError: true});
    } else {this.setState({nameLastError: false});}
    if (this.ensureEmailValid(this.state.email)){
      error = true;
      this.setState({emailError: true});
    } else {this.setState({emailError: false});}
    if (this.state.school==""){
      error = true;
      this.setState({schoolError: true});
    } else {this.setState({schoolError: false});}
    //all information is valid - submit to backend
    if (!error){
      const user = {  //create user object
        _id: this.props.userID,//grab _id of created user
        nameFirst: this.state.nameFirst,
        nameLast: this.state.nameLast,
        email: this.state.email,
        school: this.state.school
      };
      const response = UserApi
        .createUserInfo(
          user
        )
        .then((response) => {
          if (response==-1){
            alert("error adding information to database");
          }
          else {
          //alert('You\'ve created an account! Name: ' + this.state.nameFirst);    //update user object and redirect to profile page
          this.props.accountCreationSuccess();
          event.preventDefault();
          }
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
        <Paper elevation={2} style={style.paper}>
          <Grid container spacing={8}>
            <Grid item xs={12}>
              <Typography type={'display1'} style={style.heading}>Tell us about yourself</Typography>
            </Grid>

            <Grid item xs={12}>
              <FormControl error={this.state.nameFirstError}>
                <InputLabel>First Name</InputLabel>
                <Input name='nameFirst' value={ this.state.nameFirst } type='text' onChange={ this.handleChange }/>
                {this.state.nameFirstError && <FormHelperText id="name-error-text">Please enter your first name</FormHelperText>}
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl error={this.state.nameLastError}>
                <InputLabel>Last Name</InputLabel>
                <Input name='nameLast' value={ this.state.nameLast } type='text' onChange={ this.handleChange }/>
                {this.state.nameLastError && <FormHelperText id="name-error-text">Please enter your last name</FormHelperText>}
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl error={this.state.emailError}>
                <InputLabel>Email</InputLabel>
                <Input name='email' value={ this.state.email } type='email' onChange={ this.handleChange }/>
                {this.state.emailError && <FormHelperText id="name-error-text">Please enter a valid email</FormHelperText>}
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl error={this.state.schoolError}>
                <InputLabel>School</InputLabel>
                <Input name='school' value={ this.state.school } type='text' onChange={ this.handleChange }/>
                {this.state.schoolError && <FormHelperText id="name-error-text">Please enter your school</FormHelperText>}
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <Button raised color='primary' style={ style.button } type = 'submit' onClick = {this.handleSubmit} >Submit</Button>
            </Grid>
          </Grid>
        </Paper>
      </div>
    );
  }
}

export default SignUpInfoForm;
