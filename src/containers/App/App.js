
// App.js

import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import About from '../About/About';
import NotFound from '../NotFound/NotFound';
import UserProfile from '../UserProfile/UserProfile';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={About} />
        <Route exact path="/404" render={(props) => (
          <NotFound {...props} name="TEST" />
        )}/>
        <Route exact path="/user" component={UserProfile} />
      </Switch>
    );
  }
}

export default App;