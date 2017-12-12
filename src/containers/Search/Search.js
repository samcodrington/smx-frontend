// Search.js
import React, { Component } from 'react';

import Grid from 'material-ui/Grid';

import SearchBar from '../../components/SearchBar';
import ResultsBox from '../../components/ResultsBox';
import { withTheme } from 'material-ui/styles';

import TextbookApi from '../../api/TextbookApi';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchField: '',
      textbookResults: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    if(this.state.searchField === '') {
      alert('No text entered!');
    } else {
      const searchString = this.state.searchField;
      const response = TextbookApi
        .searchTextbook(
          searchString
        )
        .then((response) => {
          if (response!='-1'){//check if their are results
          alert(JSON.stringify(response));
          this.setState({
          textbookResults: response,
          });
          event.preventDefault();
          }
          else {//set textbookResults object to blank
            this.setState({
            textbookResults: [],
            });
          }
        })
        .catch((response) => {
          alert('Something went wrong: ' + response.status);
        }
      );
    }
  }

  handleChange(event) {
    this.setState({
      searchField: event.target.value,
    });
  }

  render() {
    const classes = {
      root: {
        width: '100%',
        height: '100%',
        overflow: 'hidden',
      }
    }
    return (
      <div className='Search' style={ classes.root }>
        <h1>
          Search
        </h1>
        <Grid container alignContent={'center'} alignItems={'center'} justify={'center'}>
          <Grid item xs={12} s={12} md={12} lg={12} xl={12} >{/*use full width for all screen sizes*/}
            <SearchBar
              searchParams = {this.state.searchField}
              handleSubmit={this.handleSubmit}
              handleChange={this.handleChange}
            />
          </Grid>
          <Grid item xs={12} s={12} md={12} lg={12} xl={12} >{/*use full width for all screen sizes*/}
            <ResultsBox
              results={this.state.textbookResults}
            />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default Search;
