
// About.js

import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class About extends Component {
  render() {
    return (
      <div className='About'>
        <h1>
          Home
        </h1>

        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/sign-up">Sign Up</Link></li>
          <li><Link to="/sign-in">Sign In</Link></li>
        </ul>
      </div>
    );
  }
}

export default About;
