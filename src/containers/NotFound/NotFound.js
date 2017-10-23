
// NotFound.js

import React, { Component } from 'react';

class NotFound extends Component {

  render() {
    return (
      <div className='NotFound'>
        <h1>
          404 <small>Not Found :(</small>
        </h1>
        <p> sorry </p>
        <img src="https://media.giphy.com/media/kS2qLKwGk3MXe/giphy.gif" alt="Sorry" title="Sorry" />
      </div>
    );
  }
}

export default NotFound;