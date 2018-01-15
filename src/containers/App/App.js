
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

class App extends Component {
  render() {
    const { theme } = this.props;

    const classes = {
      root: {
        width: '100%',
        height: '100%',
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
        position: 'relative',
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
                  <Route exact path='/sign-in' component={SignIn} />
                  <Route exact path='/about' component={About} />
                  <Route exact path='/search' component={Search} />
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
