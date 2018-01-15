// SearchBar.js

// React
import React, { Component } from 'react';

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
      isSearching: false
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSearchOpen = this.handleSearchOpen.bind(this);
    this.handleSearchClose = this.handleSearchClose.bind(this);
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

  handleSubmit(event) {
    event.preventDefault();

    if(this.state.searchText === '') {
      alert('No text entered!');
    } else {
      const searchString = this.state.searchText;
      const response = TextbookApi
        .searchTextbook(
          searchString
        )
        .then((response) => {
          if (response!='-1'){//check if their are results
          alert(JSON.stringify(response));
          var initialUpper, initialUpperDisabled;
          if (response.length<10){
            initialUpper = response.length;
            initialUpperDisabled = true
          }
          else {
            initialUpper = 10
            initialUpperDisabled = false
          }
          this.setState({
          textbookResults: response,
          renderLower: 0,
          renderUpper: initialUpper,
          disablePrevButton: true,
          disableNextButton: initialUpperDisabled
          });
          event.preventDefault();
          }
          else {//set textbookResults object to blank
            this.setState({
            textbookResults: [],
            });
            alert("No matching results.");//current default message when no results returned
          }
        })
        .catch((response) => {
          alert('Something went wrong: ' + response.status);
        }
      );
    }

    this.setState({ isSearching: false});
  }

  render() {

    if(this.state.isSearching === true) {
      return(
        <div style={ style.searchBar }>
          <Paper elevation={2} style={ style.paper }>
            <Input name='search' value={ this.state.searchText } type='text' onChange={ this.handleChange } style={ style.textField }
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
