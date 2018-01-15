// Navbar.js

import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import NavBarList from '../components/NavBarList';
import SearchBar from '../components/SearchBar';

import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import Drawer from 'material-ui/Drawer';

import MenuIcon from 'material-ui-icons/Menu';
import SearchIcon from 'material-ui-icons/Search';

const style = {
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  flexButton: {
    position: 'absolute',
    right: '10px',
  } 
}

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      searching: false
    };

    this.handleDrawerOpen = this.handleDrawerOpen.bind(this);
    this.handleDrawerClose = this.handleDrawerClose.bind(this);
  }

  handleDrawerOpen(event) {
    this.setState({ open: true });
  }

  handleDrawerClose(event) {
    this.setState({ open: false })
  }

  render() {  
    var isSearching = this.state.searching;

    return(
      <div>
        <AppBar style={ this.props.style }>
          <Toolbar >
            <Drawer open={ this.state.open } onKeyDown={ this.handleDrawerClose } onClick={ this.handleDrawerClose }>
              <div>
                <NavBarList />
              </div>
            </Drawer>

            <IconButton color="contrast" aria-label="Menu" onClick={ this.handleDrawerOpen } style={ style.menuButton }> 
              <MenuIcon />
            </IconButton>

            <Typography color="inherit" type="title">
              Toolbar
            </Typography>

            <SearchBar isSearching={ isSearching } style={style.flexButton} />
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

// <SearchBar searching={ isSearching } />

//<IconButton color="contrast" aria-label="Search" onClick={ this.handleSearchOpen } style={ style.flexButton }> 
//  <SearchIcon />
//</IconButton>

export default Navbar;