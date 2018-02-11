// Navbar.js

// React
import React, { Component } from 'react';
import { Link, withRouter} from 'react-router-dom';

// Components
import NavBarList from '../components/NavBarList';
import SearchBar from '../components/SearchBar';

// Material UI
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import Drawer from 'material-ui/Drawer';

// Icons
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
  },
  searchButton: {
    position: 'absolute',
    right: '10px'
  },
  icon: {
    color: "white"
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
    if (!isLoggedIn){
      var current_location = window.location.pathname;
      var logLink;
      var logText;
      if(current_location === "/") {
        logLink = "/sign-in";
        logText = "Log In";
      }
      else {
        logLink = "/";
        logText = "Sign Up";
      }
      logInOutButton = 
        <Button raised color="primary" style={ style.searchButton } component={Link} to={logLink}>
          {logText}
        </Button>
    }

    // search
    let searchBar = null;
    if(isLoggedIn) {
      searchBar = 
        <SearchBar style={style.searchButton} />
    }

    // menu
    let menu = null;
    if(isLoggedIn) {
      menu = 
        <div>
          <Drawer open={ this.state.open } onKeyDown={ this.handleDrawerClose } onClick={ this.handleDrawerClose }>
            <div>
              <NavBarList triggerLogout = {this.triggerLogout} isLoggedIn = {this.state.isLoggedIn}/>
            </div>
          </Drawer>

          <IconButton color="contrast" aria-label="Menu" onClick={ this.handleDrawerOpen } style={ style.menuButton }> 
            <MenuIcon style={style.icon}/>
          </IconButton>
        </div>
    }

    return(
      <div>
        <AppBar style={ this.props.style }>
          <Toolbar >
            { menu }

            <Typography color="inherit" type="title">
              QTextbook
            </Typography>

            { searchBar }
            { logInOutButton }
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

