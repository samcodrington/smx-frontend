
// App.js

import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import About from '../About/About';
import NotFound from '../NotFound/NotFound';
import UserProfile from '../UserProfile/UserProfile';
import SignUp from '../SignUp/SignUp';
import SignIn from '../SignIn/SignIn';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={About} />
        <Route exact path="/user" component={UserProfile} />
        <Route exact path='/sign-up' component={SignUp} />
        <Route exact path='sign-in' component={SignIn} />
        <Route exact path="*" component={NotFound} />
      </Switch>
    );
  }
}

export default App;