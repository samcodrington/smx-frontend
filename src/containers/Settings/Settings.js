// Settings.js

// React
import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

// Material UI
import { withStyles } from 'material-ui/styles';
import List, { ListItem, ListItemText } from 'material-ui/List';
import ListSubheader from 'material-ui/List/ListSubheader';
import Divider from 'material-ui/Divider';
import Grid from 'material-ui/Grid';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Paper from 'material-ui/Paper';
import Tabs, { Tab } from 'material-ui/Tabs';
import AppBar from 'material-ui/AppBar';


// APIs
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
  },
  paperContainer: {
    height: '70vh',
    margin: 'auto',
    width: '80%',
    'z-index': 50
  },
  infoContainer: {
    'padding': 20
  },
  tab: {
    width: '95%',
    margin: 'auto',
    'z-index': 100
  }
};

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      formType: 'profile',
      formChange: false,
      username: this.props.user.username,
      password: '',
      passwordOld: '',
      passwordNew: '',
      nameFirst: this.props.user.nameFirst,
      nameLast: this.props.user.nameLast,
      email: this.props.user.email,
      school: this.props.user.school,
      tabval: 0
    }

    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSubmitDelete = this.handleSubmitDelete.bind(this);
  }

  //reset any potential changes if handleSubmit hasn't been clicked
  handleClick = (event,name,tab) => {
    this.setState({
      formType: name,
      tabval: tab,
      formChange: false,
      username: this.props.user.username,
      nameFirst: this.props.user.nameFirst,
      nameLast: this.props.user.nameLast,
      email: this.props.user.email,
      school: this.props.user.school
    });
    };

  handleChange(event){
    this.setState({[event.target.name]: event.target.value, formChange: true});
  }

  handleSubmit(event) {
    var dontSend=false
    event.preventDefault();
    if (this.state.formChange){ //don't send a submission if the form hasn't been touched
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
      if (this.state.username==""){//cannot have blank username
        this.setState({userError: true})
        dontSend=true
      } else {this.setState({userError: false})}

      //ensure that passwordOld field matches current password and password matches
      //passwordNew. Also ensure that password was entered.
      if (!(this.state.passwordOld=="" && this.state.password=="" && this.state.passwordNew=="")){//ignore if all fields blank
        if (this.state.passwordOld!=this.props.user.password){//password entered and incorrect
          alert("password doesn't match original");
          alert(this.props.user.password);
          this.setState({passwordOldError: true})
          dontSend=true
        } else {this.setState({passwordOldError: false})}
        if (this.state.password!=this.state.passwordNew || this.state.password==""){//password don't match
          this.setState({passwordError: true})
          alert("new passwords don't match");
          dontSend=true
        } else {this.setState({passwordError: false})}
      }
      else {this.setState({password: this.props.user.password})}//pass unchanged password to backend
      alert(dontSend);
      if (!dontSend){
        this.sendUser(2);
        }
    }
    }
  }

  sendUser(useCase){
    var username,password;
    if (useCase==1){
      password=this.props.user.password;
    }
    else if (useCase==2){
      if (this.state.username==this.props.user.username){//username will trigger unique error in backend if not forced to undefined for password update
        username = undefined;
      }
      else {
        username = this.state.username;
      }
      password=this.state.password;
    }
    const user = {
      username: username,
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
      .then((response) => {
        this.setState({redirect: true}); //user deleted successfully
        alert("Settings updated successfully")
      })//need to update frontend user with new data
      .catch((response) => {
          alert('Something went wrong: ' + response.status);
      });
    } else {
    // Do nothing!
    }
  }


  render() {
    if (this.state.redirect){
      this.setState({redirect: false});
      return(
        <Redirect push to="/"/>
      );
    }
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
            <Input name='passwordOld' value={ this.state.passwordOld } type='password' onChange={ this.handleChange }/>
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
        <Grid container spacing={8}>
          <Grid item xs={12}>
            <Paper className="UserInfo" elevation={5} style={ styles.paperContainer }>
              <AppBar position="static">
                <Tabs value={this.state.tabval} onChange={this.handleChange} fullWidth centered>
                  <Tab label="Profile" onClick={(event) => this.handleClick(event, "profile",0)}/>
                  <Tab label="Account" onClick={(event) => this.handleClick(event, "account",1)}/>
                </Tabs>
              </AppBar>
              <Grid container style={ styles.infoContainer } justify={"center"}>
                {formRender}
              </Grid>
            </Paper>
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
