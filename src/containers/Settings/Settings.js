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
  }

  handleClick = (event,name) => {
    this.setState({formType: name});
    };

  handleChange(event){
    alert(event.target.value);
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
          <Button raised color='primary' style={ styles.button } onClick={ this.handleSubmit }>Submit</Button>
        </Grid>
        <Grid item xs={12}>
          <Button raised color='secondary' style={ styles.button } onClick={ this.handleSubmit }>Delete Account</Button>
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
