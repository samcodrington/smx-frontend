// SearchBar.js

// React
import React, { Component } from 'react';

// Material UI Components
//import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';

// Icons
import SearchIcon from 'material-ui-icons/Search';

class SearchBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    if(this.props.isSearching) {
      
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
