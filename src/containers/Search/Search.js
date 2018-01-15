// Search.js
import React, { Component } from 'react';

import Grid from 'material-ui/Grid';

import SearchBar from '../../components/SearchBar';
import ResultsBox from '../../components/ResultsBox';
import { withTheme } from 'material-ui/styles';

import TextbookApi from '../../api/TextbookApi';
import Typography from 'material-ui/Typography';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchField: '',
      textbookResults: [],
      renderLower: 0,   //lower index to render textbook entries
      renderUpper: 10,   //Upper index to render textbook entries
      disablePrevButton: true,
      disableNextButton: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.changeShownResults = this.changeShownResults.bind(this);
  }

  //function iterates through results according to the prop resultsPerPage
  //goForward 'true' indicates to increment results, 'false' to decrement
  changeShownResults(goForward){
    var lowerIndex, upperIndex
    var disablePrev = false
    var disableNext = false
    var resultsPerPage = 10
    //next button clicked, increment search results
    if (goForward){
      //next page shown will have less than resultsPerPage
      if ( (this.state.renderUpper+resultsPerPage)>this.state.textbookResults.length ){
        lowerIndex = this.state.renderLower + resultsPerPage
        upperIndex = this.state.textbookResults.length
        disableNext = true
      }
      else {
        lowerIndex = this.state.renderLower + resultsPerPage
        upperIndex = this.state.renderUpper + resultsPerPage
      }
    }
    //prev button clicked, decrement search results
    else {
      //prev page shown will be below zero
      if (this.state.renderLower-resultsPerPage===0){
        disablePrev = true
      }
      lowerIndex = this.state.renderLower - resultsPerPage
      upperIndex = lowerIndex + resultsPerPage
    }
    this.setState({
        renderLower: lowerIndex,
        renderUpper: upperIndex,
        disablePrevButton: disablePrev,
        disableNextButton: disableNext
    });
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
  }

  handleChange(event) {
    this.setState({
      searchField: event.target.value,
    });
  }

  render() {
    return (
      <div className='Search'>
      <Typography type={'display1'}>Search</Typography>
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
              changeShownResults={this.changeShownResults}
              renderLower={this.state.renderLower}
              renderUpper={this.state.renderUpper}
              disablePrevButton={this.state.disablePrevButton}
              disableNextButton={this.state.disableNextButton}
            />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default Search;
