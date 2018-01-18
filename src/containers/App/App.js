
// App.js

import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import { withTheme } from 'material-ui/styles';
import Grid from 'material-ui/Grid';

import About from '../About/About';
import NotFound from '../NotFound/NotFound';
import UserProfile from '../UserProfile/UserProfile';
import SignUp from '../SignUp/SignUp';
import SignIn from '../SignIn/SignIn';
import Search from '../Search/Search';
import Navbar from '../../components/Navbar'
import PostTextbook from '../Textbook/PostTextbook'

import AuthApi from '../../api/AuthApi';
class App extends Component {
  constructor(props){
    super(props);
    this.state = {
        isLoggedIn: false,
        user: null
    };
  }



  //callbacks for authentiation
  checkLoginStatus = () => {
    AuthApi.verify()
    .then((response) => {
      if (this.state.isLoggedIn == false)
        this.changeLoginStatus(true);
    })
    .catch((error) => {
      if (this.state.isLoggedIn == true)
        this.changeLoginStatus(false);
    });
  }

  changeLoginStatus = (login) =>{
    this.setState({isLoggedIn: login});
  }

  addUserInfo = (u) => {
    console.log("User: ");
    console.debug(u);
    this.setState({
      user: {
        _id: u._id,
        username: u.username,
        nameFirst: u.nameFirst,
        nameLast: u.nameLast,
        email: u.email,
        school: u.school
      }
    })
  }




  render() {
    const { theme } = this.props;

    const classes = {
      root: {
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        position: 'fixed',
        backgroundColor: theme.palette.background.default
      },
      appFrame: {
        position: 'absolute',
        display: 'flex',
        width: '100%',
        height: '100%',
      },
      navBar: {
        zIndex: 2,
        position: 'fixed'
      },
      content: {
        backgroundColor: theme.palette.background.default,
        width: '100%',
        padding: theme.spacing.unit * 3,
        height: 'calc(100% - 56px)',
        marginTop: 56,
        [theme.breakpoints.up('sm')]: {
          height: 'calc(100% - 64px)',
          marginTop: 64,
        },
        overflow: 'scroll' //remove internal scrollbar
      }
    }
    return (

      <div>
        <Grid item xs={12}>
          <Navbar style={ classes.navBar }/>
        </Grid>
        <div style={ classes.root }>
          <Grid container spacing={8}>
            <div style={ classes.appFrame }>
              <Grid item xs={12} style={ classes.content }>
                <Switch>
                  <Route exact path="/" component={SignUp} />
                  <Route exact path="/user" component={UserProfile} />
                  <Route exact path="/sign-in"
                    render = {
                      props => {
                        if (this.state.isLoggedIn == false)
                          return <SignIn
                            changeLoginStatus = {this.changeLoginStatus}
                            addUserInfo = {this.addUserInfo}
                          />
                        else
                          return <UserProfile
                            user = {this.state.user}
                          />
                      }
                    }
                  />

                  <Route exact path='/about' component={About} />
                  <Route exact path='/search' component={Search} />
                  <Route exact path='/PostTextbook'
                    render = {
                      props => {
                        return <PostTextbook
                        />
                      }
                    }
                  />
                  <Route exact path="*" component={NotFound} />
                </Switch>
              </Grid>
            </div>
          </Grid>
        </div>
      </div>
    );
  }
}

export default withTheme()(App);
