// SearchBar.js

import React, { Component } from 'react';

//Import Material-ui components
import TextField from 'material-ui/TextField';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';

import TextbookApi from '../api/TextbookApi';


//Add const style object (if needed)
const style = {
  paper: {
    textAlign: 'center',
    padding: 20
  },
  button: {
    marginTop: 10
  }
}


class SearchBar extends Component {
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
          alert(JSON.stringify(response));
          this.setState({
          textbookResults: response,
        });
          event.preventDefault();
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
    var title;
    var namesList = this.state.textbookResults.map(function(textbook){
      title = textbook.title;
      return <Grid container spacing={8} alignContent={'center'} alignItems={'center'} justify={'center'}>
        <Grid item xs={12} md={6}>
          {title}
        </Grid>
      </Grid>;
    });
    return(
      <div>
        <Grid container spacing={8}>
          <Grid item xs={12}>
            <TextField
              value={ this.state.searchField }
              onChange={ this.handleChange }
            />
          </Grid>
          <Grid item xs={12}>
            <Button raised color='primary' style={ style.button } onClick={ this.handleSubmit}>Submit</Button>
          </Grid>
        </Grid>
        <Grid container spacing={8}>
          {namesList}
        </Grid>
      </div>
    );
  }

}


export default SearchBar;
