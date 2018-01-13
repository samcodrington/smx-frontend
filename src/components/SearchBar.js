// SearchBar.js

import React, { Component } from 'react';

//Import Material-ui components
import TextField from 'material-ui/TextField';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';


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

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    this.props.handleSubmit(event);
  }

  handleChange(event) {
    this.props.handleChange(event);
  }

  render() {
    return(
      <div>
        <Grid container spacing={8}>
          <Grid item xs={12} s={3} md={3} lg={3} xl={3}>{/* TextField */}
            <TextField
              value={ this.props.searchField }
              onChange={ this.handleChange }
              fullWidth={true}
            />
          </Grid>
          <Grid item xs={12} s={3} md={3} lg={3} xl={3}>{/* Submit Button */}
            <Button raised color='primary' style={ style.button } onClick={ this.handleSubmit}>Submit</Button>
          </Grid>
        </Grid>
      </div>
    );
  }
};


export default SearchBar;
