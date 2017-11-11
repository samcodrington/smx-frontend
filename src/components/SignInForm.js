// SignInForm.js

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
              <Button raised color='primary' style={ style.button }>Submit</Button>
            </Grid>
          </Grid>
        </Paper>
      </div>
    );
  }
}

export default SignInForm;