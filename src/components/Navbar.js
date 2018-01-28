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
  loginButton: {
    position: 'absolute',
    right: '10px',
  } 
}

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      isLoggedIn: this.props.isLoggedIn //
    };
    this.triggerLogout = this.props.triggerLogout.bind(this);

    this.handleDrawerOpen = this.handleDrawerOpen.bind(this);
    this.handleDrawerClose = this.handleDrawerClose.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  componentWillReceiveProps(nextProps){
    //Update isLoggedIn if it changes
    if (nextProps.isLoggedIn != this.props.isLoggedIn)
      this.setState({isLoggedIn: nextProps.isLoggedIn});
  }

  handleDrawerOpen(event) {
    this.setState({ open: true });
  }

  handleDrawerClose(event) {
    this.setState({ open: false });
  }


  handleClick(event){
    this.triggerLogout();
  }


  render() {
    var isSearching = this.state.isSearching;
    
    //Define Login/Logout Button
    let isLoggedIn = this.state.isLoggedIn;
    let logInOutButton = null;
    if (isLoggedIn){
      logInOutButton = 
        <Button color="contrast" style={ style.flexButton } onClick = {this.handleClick} >
          Logout 
        </Button>
    } else {
      logInOutButton = 
        <Button color="contrast" style={ style.flexButton } component={Link} to="/sign-in">
          Login
        </Button>
    }

    return(
      <div>
        <AppBar style={ this.props.style }>
          <Toolbar >
            <Drawer open={ this.state.open } onKeyDown={ this.handleDrawerClose } onClick={ this.handleDrawerClose }>
              <div>
                <NavBarList />
                <IconButton color="contrast" aria-label="Menu"  style={ style.menuButton }>
                  <MenuIcon />
                </IconButton>
              </div>
            </Drawer>

            <IconButton color="contrast" aria-label="Menu" onClick={ this.handleDrawerOpen } style={ style.menuButton }> 
              <MenuIcon />
            </IconButton>
            {logInOutButton}
            <Typography color="inherit" type="title">
              Toolbar

            </Typography>

            <SearchBar style={style.flexButton} />

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

