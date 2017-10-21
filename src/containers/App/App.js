
// App.js

import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import About from '../About/About';
import NotFound from '../NotFound/NotFound';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={About} />
        <Route exact path="/404" component={NotFound} />
      </Switch>
    );
  }
}

export default App;
