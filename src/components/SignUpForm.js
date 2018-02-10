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

class SignInForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      confirm: '',
      usernameError: false,
      usernameTakenError: false,
      passwordError: false,
      confirmError: false
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
    var error = false;
    event.preventDefault();
    if (this.state.username==""){
      this.setState({usernameError: true});
      error = true;
    } else {this.setState({usernameError: false}); }
    if (this.state.password.length<8){
      this.setState({passwordError: true});
      error = true;
    } else {this.setState({passwordError: false}); }
    if(this.state.password !== this.state.confirm) {
      this.setState({confirmError: true});
      error = true;
    } else {this.setState({confirmError: false});}
    //no error in form, proceed with signup
    if (!error){
      const user = {
        username: this.state.username,
        password: this.state.password
      };
      const response = UserApi
        .createUser(
          user
        )
        .then((response) => {
          if(response==-1){
            //alert("username taken, please enter a new username")
            this.setState({usernameTakenError: true});
          }
          else {
          alert('You\'ve created an account! Name: ' + this.state.username);
          alert(response);
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
              <Typography type={'display1'} style={style.heading}>Sign Up</Typography>
            </Grid>

            <Grid item xs={12}>
              <FormControl error={this.state.usernameError || this.state.usernameTakenError}>
                <InputLabel>Username</InputLabel>
                <Input name='username' value={ this.state.username } type='text' onChange={ this.handleChange }/>
                {this.state.usernameError && <FormHelperText id="name-error-text">Please enter a username</FormHelperText>}
                {this.state.usernameTakenError && <FormHelperText id="name-error-text">Sorry, that username is taken</FormHelperText>}
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl error={this.state.passwordError}>
                <InputLabel>Password</InputLabel>
                <Input name='password' value={ this.state.password } type='password' onChange={ this.handleChange }/>
                {this.state.passwordError && <FormHelperText id="name-error-text">please enter at least 8 characters</FormHelperText>}
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl error={this.state.confirmError}>
                <InputLabel>Confirm Password</InputLabel>
                <Input name='confirm' value={ this.state.confirm } type='password' onChange={ this.handleChange }/>
                {this.state.confirmError && <FormHelperText id="name-error-text">passwords do not match</FormHelperText>}
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

export default SignInForm;
