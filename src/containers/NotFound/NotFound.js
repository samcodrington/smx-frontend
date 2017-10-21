
// NotFound.js

import React, { Component } from 'react';

import TestApi from '../../api/test-api.js'

class NotFound extends Component {

  render() {
    var ApiInstance = new TestApi
    var foo = ApiInstance.getText();

    return (
      <div className='NotFound'>
        <h1>
          404 <small>Not Found :(</small>
        </h1>

        <p> {foo} </p>
      </div>
    );
  }
}

export default NotFound;