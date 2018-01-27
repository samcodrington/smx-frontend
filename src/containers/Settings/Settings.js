// Settings.js

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import List, { ListItem, ListItemText } from 'material-ui/List';
import ListSubheader from 'material-ui/List/ListSubheader';
import Divider from 'material-ui/Divider';
import Grid from 'material-ui/Grid';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';

import UserApi from '../../api/UserApi'

const styles = {
  root: {
    width: '100%',
    maxWidth: '360px',
  },
  button: {
    marginTop: 10
  },
  container: {
    position: 'absolute',
    left: '0px',
    top: '50px'
  }
};

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formType: 'profile',
      username: this.props.user.username,
      password: '',
      passwordOld: '',
      passwordNew: '',
      nameFirst: this.props.user.nameFirst,
      nameLast: this.props.user.nameLast,
      email: this.props.user.email,
      school: this.props.user.school
    }

    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSubmitDelete = this.handleSubmitDelete.bind(this);
  }

  //reset any potential changes if handleSubmit hasn't been clicked
  handleClick = (event,name) => {
    this.setState({
      formType: name,
      username: this.props.user.username,
      nameFirst: this.props.user.nameFirst,
      nameLast: this.props.user.nameLast,
      email: this.props.user.email,
      school: this.props.user.school
    });
    };

  handleChange(event){
    this.setState({[event.target.name]: event.target.value});
  }

  handleSubmit(event) {
    var dontSend=false
    event.preventDefault();

    if (this.state.formType=="profile"){
      //do some basic error checking on entered textbook
      if (this.state.nameFirst==""){
        this.setState({nameFirstError: true})
        dontSend=true
      } else {this.setState({nameFirstError: false})}
      if (this.state.nameLast==""){
        this.setState({nameLastError: true})
        dontSend=true
      } else {this.setState({nameLastError: false})}
      if (this.state.email==""){
        this.setState({emailError: true})
        dontSend=true
      } else {this.setState({emailError: false})}
      if (this.state.school==""){
        this.setState({schoolError: true})
        dontSend=true
      } else {this.setState({schoolError: false})}
      if (!dontSend){
        this.sendUser(1);
        }
    }
    else if (this.state.formType=="account"){
      //ensure that passwordOld field matches current password and password matches
      //passwordNew. Also ensure that password was entered
      if (this.state.username==""){
        this.setState({userError: true})
        dontSend=true
      } else {this.setState({userError: false})}

      if (this.state.password!="" && this.state.passwordOld!="" && this.state.passwordNew!=""){
        if (this.state.passwordOld!=this.props.user.password){//password entered and incorrect
          this.setState({passwordOldError: true})
          dontSend=true
        } else {this.setState({passwordOldError: false})}
        if (this.state.password!=this.state.passwordNew){//password don't match
          this.setState({passwordError: true})
          dontSend=true
        } else {this.setState({passwordError: false})}
      }
      else {this.setState({password: this.props.user.password})}//pass unchanged password to backend

      if (!dontSend){
        this.sendUser(2);
        }
    }
  }

  sendUser(useCase){
    var password
    if (useCase==1){
      password=this.props.user.password;
    }
    else if (useCase==2){
      password=this.state.password;
    }
    const user = {
      username: this.state.username,
      password: password,
      nameFirst: this.state.nameFirst,
      nameLast: this.state.nameLast,
      email: this.state.email,
      school: this.state.school,
      _id: this.props.user._id
    }
    const response = UserApi
    .settings(user,useCase)
    .then((response) => {alert("Settings updated successfully")})//need to update frontend user with new data
    .catch((response) => {
        alert('Something went wrong: ' + response.status);
    });
  }

  handleSubmitDelete(){
    const user = {
      username: this.props.user.username,
      password: this.props.user.password,
      nameFirst: this.props.user.nameFirst,
      nameLast: this.props.user.nameLast,
      email: this.props.user.email,
      school: this.props.user.school,
      _id: this.props.user._id
    }
    if (window.confirm('Are you sure you want to delete your account?')) {
      const response = UserApi
      .settings(user,3)
      .then((response) => {alert("Settings updated successfully")})//need to update frontend user with new data
      .catch((response) => {
          alert('Something went wrong: ' + response.status);
      });
    } else {
    // Do nothing!
    }
  }


  render() {
    var formRender;
    if (this.state.formType=="profile"){
      formRender =
      <div>
        <Grid item xs={12} md={12}>
          <Typography>Change Personal Settings</Typography>
        </Grid>
        <Grid item xs={12} md={12}>
          <FormControl >
            <InputLabel>First Name</InputLabel>
            <Input name='nameFirst' value={ this.state.nameFirst } type='text' onChange={ this.handleChange }/>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={12}>
          <FormControl >
            <InputLabel>Last Name</InputLabel>
            <Input name='nameLast' value={ this.state.nameLast } type='text' onChange={ this.handleChange }/>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={12}>
          <FormControl >
            <InputLabel>email</InputLabel>
            <Input name='email' value={ this.state.email } type='text' onChange={ this.handleChange }/>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={12}>
          <FormControl >
            <InputLabel>school</InputLabel>
            <Input name='school' value={ this.state.school } type='text' onChange={ this.handleChange }/>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Button raised color='primary' style={ styles.button } onClick={ this.handleSubmit}>Update</Button>
        </Grid>
    </div>;
    }
    else if (this.state.formType=="account"){
      formRender =
      <div>
        <Grid item xs={12} md={12}>
          <Typography>Change Account Settings</Typography>
        </Grid>
        <Grid item xs={12} md={12}>
          <FormControl >
            <InputLabel>Username</InputLabel>
            <Input name='username' value={ this.state.username } type='text' onChange={ this.handleChange }/>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={12}>
          <FormControl >
            <InputLabel>Old password</InputLabel>
            <Input name='password' value={ this.state.passwordOld } type='password' onChange={ this.handleChange }/>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={12}>
          <FormControl >
            <InputLabel>New password</InputLabel>
            <Input name='password' value={ this.state.password } type='password' onChange={ this.handleChange }/>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={12}>
          <FormControl >
            <InputLabel>retype password</InputLabel>
            <Input name='passwordNew' value={ this.state.passwordNew } type='password' onChange={ this.handleChange }/>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Button raised color='primary' style={ styles.button } onClick={ this.handleSubmit }>Update</Button>
        </Grid>
        <Grid item xs={12}>
          <Button raised color='secondary' style={ styles.button } onClick={ this.handleSubmitDelete }>Delete Account</Button>
        </Grid>
      </div>;
    }
    return (
      <div className='Settings'>
        <Grid container spacing={8} aligncontent={'center'} alignItems={'center'} justify={'center'}>
          <Grid xs={12} md={4} style={styles.container}>
          <List styles={styles.root}  subheader={<ListSubheader>Personal Settings</ListSubheader>}>
            <ListItem button onClick={(event) => this.handleClick(event, "profile")}>
              <ListItemText primary="Profile" />
            </ListItem>
            <Divider />
            <ListItem button onClick={(event) => this.handleClick(event, "account")}>
              <ListItemText primary="Account" />
            </ListItem>
          </List>
          </Grid>
          <Grid xs={12} md={8}>
            {formRender}
          </Grid>
        </Grid>
      </div>
    );
  }
}

Settings.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default Settings;
