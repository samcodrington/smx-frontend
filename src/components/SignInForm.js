// SignInForm.js

import React, { Component } from 'react';

import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';

import authApi from '../api/AuthApi';

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
      password: ''
    };
    this.changeLoginStatus = this.props.changeLoginStatus.bind(this);
    this.addUserInfo = this.props.addUserInfo.bind(this);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  };

  

  handleChange(event) {
    const target = event.target;

    const name = target.name;
    const value = target.value;

    this.setState({[name]: value});
  }

  handleSubmit(event) {
    console.log("Signin attempt!");
    event.preventDefault();
    if(this.state.username === '' || this.state.password === '') {
      alert('Must have username and password');
    } else {
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
          this.addUserInfo(response);
          this.changeLoginStatus(true);  //triggers a component change from app.js
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
              <Typography type={'display1'} style={style.heading}>Sign In</Typography>
            </Grid>

            <Grid item xs={12}>
              <FormControl >
                <InputLabel>Username</InputLabel>
                <Input name='username' value={ this.state.username } type='text' onChange={ this.handleChange }/>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl >
                <InputLabel>Password</InputLabel>
                <Input name='password' value={ this.state.password } type='password' onChange={ this.handleChange }/>
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
