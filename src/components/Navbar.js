// Navbar.js

import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';

const style = {
  navbar: {
    position: 'relative'
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  flexButton: {
    position: 'absolute',
    right: '10px'
  } 
}

class Navbar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div>
        <AppBar position="static" style={ style.navbar }>
          <Toolbar >

            <IconButton color="contrast" aria-label="Menu"  style={ style.menuButton }>
              <MenuIcon />
            </IconButton>

            <Typography color="inherit" type="title">
              Queen's Textbook Exchange
            </Typography>

            <Button color="contrast" style={ style.flexButton }>Login</Button>

          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default Navbar;