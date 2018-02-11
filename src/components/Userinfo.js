

// React
import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';

// Material UI
import Button from 'material-ui/Button';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Avatar from 'material-ui/Avatar';
import Grid from 'material-ui/Grid';
import Divider from 'material-ui/Divider';
import Hidden from 'material-ui/Hidden';

// Icons
import SearchIcon from 'material-ui-icons/Search';

const style = {
  container: {
    height: '80vh',
    margin: 'auto',
    width: '80%'
  },
  titleDivider: {
    'margin-top': 10,
    'margin-bottom': 20
  },
  header: {
    height: '10vh'
  },
  infoContainer: {
    'padding': 20
  },
  infoBody: {
    height: 'calc(65vh - 100px)'
  },
  infoButton: {
    height: '5vh'
  },
  spacer: {
    height: 40
  }
}

class UserInfo extends Component{
  constructor(props){
    super(props);
    this.state = {
      nameFirst : props.user.nameFirst,
      nameLast : props.user.nameLast,
      email : props.user.email,
      school : props.user.school
    };
  }

  render(){
    const user = this.props.user;
    const firstname = user.nameFirst;
    const lastname = user.nameLast;
    const school = user.school;
    const email = user.email;

    //{this.props.nameFirstr.charAt(0)}
    return (
      <div className ='UserInfo'>
        <Paper className="UserInfo" elevation={20} style={ style.container }>
          <Grid container style={ style.infoContainer }>
            <Grid item xs={0} sm={0} md={2}></Grid>
            <Grid item xs={12} sm={12} md={8} style={style.header}>
              <Typography type="display1" color="inherit">
                Hey {firstname},
              </Typography>
              <Typography type="headline" color="textSecondary">
                Here's what your profile looks like:
              </Typography>
              <Divider style={ style.titleDivider } />
              <Typography type="subtitle" color="inherit" gutterBottom={true}>
                <b>First Name:</b> {firstname}
              </Typography>
              <Typography type="subtitle" color="inherit" gutterBottom={true}>
                <b>Last Name:</b> {lastname}
              </Typography>
              <Typography type="subtitle" color="inherit" gutterBottom={true}>
                <b>School:</b> {school}
              </Typography>
              <Typography type="subtitle" color="inherit" gutterBottom={true}>
                <b>Email:</b> {email}
              </Typography>
            </Grid>

            <Grid item xs={12} style={ style.infoBody }>
            </Grid>

            <Hidden xsDown >
              <Grid item xs={12} style={style.spacer}>
              </Grid>
            </Hidden>

            <Grid item xs={12} style={ style.infoButton }>
              <Grid container>
                <Grid item xs={6} sm={6} md={6} >
                  <Button raised color="primary" fullWidth={true} style={ style.contactButton } component={Link} to="/manage-textbooks">
                    Manage Books
                  </Button>
                </Grid>
                <Grid item xs={6} sm={6} md={6} >
                  <Button raised color="primary" fullWidth={true} style={ style.contactButton } component={Link} to="/settings">
                    Edit Information
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </div>
    );
  }
};  

export default UserInfo;