// SearchBar.js

// React
import React, { Component } from 'react';
import { Redirect } from 'react-router';

// APIs
import TextbookApi from '../api/TextbookApi';

// Material UI Components
import IconButton from 'material-ui/IconButton';
import TextField from 'material-ui/TextField';
import Input, { InputLabel, InputAdornment } from 'material-ui/Input';
import Paper from 'material-ui/Paper';

// Icons
import SearchIcon from 'material-ui-icons/Search';
import CloseIcon from 'material-ui-icons/Close';


// style
const style = {
  searchBar: {
    position: 'absolute',
    width: '40%',
    right: '10px'
  },
  textField: {
    position: 'relative',
    width: '100%',
    margin: 'auto'
  }
}


class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: "",
      isSearching: false,
      redirect: false
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSearchOpen = this.handleSearchOpen.bind(this);
    this.handleSearchClose = this.handleSearchClose.bind(this);
    this.handleKeyboardEnter = this.handleKeyboardEnter.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;

    this.setState({"searchText": value});
  }

  handleSearchOpen(event) {
    this.setState({ isSearching: true});
  }

  handleSearchClose(event) {
    this.setState({ isSearching: false});
  }

  handleKeyboardEnter(event) {
    if(event.keyCode == 13)
    {
      this.handleSubmit(event);
      return false; // returning false will prevent the event from bubbling up.
    }
    else
    {
      return true;
    }
  }

  handleSubmit(event) {
    event.preventDefault();

    if(this.state.searchText === '') {
      alert('No text entered!');
    } else {
      this.setState({
      isSearching: false,
      redirect: true});
    }
  }

  render() {
    if(this.state.redirect === true) {
      this.setState({redirect: false});
      const query = this.state.searchText;
      const url = "/search/" + query;
      return(
        <Redirect push to={url} />
      );

    } else if(this.state.isSearching === true) {
      return(
        <div style={ style.searchBar }>
          <Paper elevation={2} style={ style.paper }>
            <Input name='search' value={ this.state.searchText } type='text' onKeyDown={this.handleKeyboardEnter} onChange={ this.handleChange } style={ style.textField }
            startAdornment={
              <InputAdornment position="end">
                <IconButton
                  onClick={this.handleSearchClose}
                >
                  <CloseIcon />
                </IconButton>
              </InputAdornment>
            }
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  onClick={this.handleSubmit}
                >
                  <SearchIcon />
                </IconButton>
              </InputAdornment>  
            }
            />
          </Paper>
        </div>
      )
    }
    else {
      return(
        <IconButton color="contrast" aria-label="Search" onClick={ this.handleSearchOpen } style={ this.props.style }> 
          <SearchIcon />
        </IconButton>
      );
    }
  }
};

export default SearchBar;
