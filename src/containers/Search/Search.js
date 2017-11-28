// Search.js
import React, { Component } from 'react';

import Grid from 'material-ui/Grid';

import SearchBar from '../../components/SearchBar';

class Search extends Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <div className='Search'>
        <h1>
          Search
        </h1>
        <Grid container spacing={8} alignContent={'center'} alignItems={'center'} justify={'center'}>
          <Grid item xs={12} md={6}>
            <SearchBar />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default Search;
