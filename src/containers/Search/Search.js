// Search.js
import React, { Component } from 'react';

import TextbookApi from '../../api/TextbookApi';

import Textbook from '../../components/Textbook';
import SearchBar from '../../components/SearchBar';
import ResultsBox from '../../components/ResultsBox';

import Grid from 'material-ui/Grid';
import { withTheme } from 'material-ui/styles';
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
    
    this.handleSubmit = this.handleSubmit.bind(this);
    //this.changeShownResults = this.changeShownResults.bind(this);
  }

  //function iterates through results according to the prop resultsPerPage
  //goForward 'true' indicates to increment results, 'false' to decrement
  /*
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
  */

  handleSubmit(query) {
    const searchString = query;
    const response = TextbookApi.searchTextbook(
        searchString)
      .then((response) => {
        //check if their are results
        if (response != '-1') {
          if(JSON.stringify(response) != JSON.stringify(this.state.textbookResults)) {
            this.setState({
              textbookResults: response
            });
          }
        }
        else {
          if(this.state.textbookResults[0] != 'no results'){
            this.setState({
              textbookResults: ['no results']
            });//current default message when no results returned
          }
        }
      }).catch((response) => {
          if(this.state.textbookResults[0] != 'error'){
            this.setState({
              textbookResults: ['error']
            });
          }
    });
    return response;
  }

  handleChange(event) {
    this.setState({
      searchField: event.target.value,
    });
  }

  handleQuerySuccess(query) {
    var bookList = []
    var books = this.state.textbookResults;
    var lengthBooks = books.length;

    // props for textbook component
    var bookTitle;
    var bookAuthor;

    //limit results
    /*
    if(lengthBooks > 12) {
      lengthBooks = 12;
    }
    */

    for(var i=0; i < lengthBooks; i++) {
      console.log(books[i])

      // book title formatting (check for length)
      bookTitle = books[i].title
      if(bookTitle.length > 20) {
        bookTitle = bookTitle.substr(0,20) + "...";
      }

      bookAuthor = books[i].author
      
      bookList.push(
        <Grid item sm={3} md={4} lg={4} xl={4}>
          <Textbook title={ bookTitle } author={ bookAuthor }/>
        </Grid>
      );
    }
    return(
      <div className='Search'>
        <Grid container>
          <Grid item sm={12} md={12} lg={12} xl={12}>
            <Typography type={'display1'}>{lengthBooks} results for "{query}"</Typography>
          </Grid>
          {bookList}
        </Grid>
      </div>
    );
    /*
    return(
      <div className='Search'>
        <Typography type={'display1'}>Results for "{query}"</Typography>
        <Grid container >
          <Grid item md={3} lg={3} xl={3}>
            <Textbook title="Da Vinci Code"/>
          </Grid>
          <Grid item md={3} lg={3} xl={3}>
            <Textbook title="TEST"/>
          </Grid>
          <Grid item md={3} lg={3} xl={3}>
            <Textbook title="TEST"/>
          </Grid>
          <Grid item md={3} lg={3} xl={3}>
            <Textbook title="TEST"/>
          </Grid>
        </Grid>
      </div>
    );
    */
  }

  handleQueryFail() {
    return(
      <div>
        <Typography component='h2'>Could not communicate with server</Typography>
      </div>
    );
  }

  handleNoResults() {
    return(
      <div>
        <Typography component='h2'>No Results</Typography>
      </div>
    );
  }

  render() {
    var query = this.props.match.params.query;
    console.log(this.props);
    var test = this.handleSubmit(query);
    //alert(JSON.stringify(test));
    
    // handle no results
    if(this.state.textbookResults[0] === 'no results') {
      return(
        this.handleNoResults()
      );
    // handle query failure
    } else if(this.state.textbookResults[0] === 'error') {
      return(
        this.handleQueryFail()
      );
    } else {
      return(
        this.handleQuerySuccess(query)
      );
    }
    
  }
}

export default Search;
