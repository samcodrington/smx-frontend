// TextbookForm.js
import React, { Component } from 'react';
import { withTheme } from 'material-ui/styles';
import Radio, { RadioGroup } from 'material-ui/Radio';
import { FormLabel, FormControl, FormControlLabel, FormHelperText } from 'material-ui/Form';
import Input, { InputLabel, InputAdornment } from 'material-ui/Input';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';

import Autosuggestlist from '../AutocompleteField';

const style = {
  paper: {
    textAlign: 'right',
    padding: 20
  },
  button: {
    marginTop: 10
  },
  left: {
    textAlign: 'left'
  },
  right: {
    textAlign: 'right'
  },
  center: {
    textAlign: 'center'
  }
}

class TextbookForm extends Component {
  constructor(props) {
    super(props);
    this.state = { priceType: '', priceValue: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleChangeTextField = this.handleChangeTextField.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  //local change handler (for non-default behaviour)
  handleChange(event){
    this.props.handleChange(event);
  }
  handleChangeTextField(event){
    this.props.handleChangeTextField(event);
  }
  handleSubmit(event){
    this.props.handleSubmit(event);
  }

  render() {
    const classes = {
      root: {
        //backgroundColor: theme.palette.background.default,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
      }
    }
    return (
      <div className='textbookForm' style={ classes.root }>
      <Paper elevation={2} style={style.paper}>
        <Grid container spacing={8}>

        <Grid item xs={6} s={6} md={6} style={style.right}>

          <Grid item xs={12} md={12}>
            <FormControl  required={true} error={this.props.nameError}>
              <InputLabel>Title</InputLabel>
              <Input name='title' value={ this.props.title } type='text' onChange={ this.handleChange }/>
              {this.props.nameError && <FormHelperText id="name-error-text">Please Enter a title</FormHelperText>}
            </FormControl>
          </Grid>

          <Grid item xs={12} md={12}>
          <FormControl >
            <InputLabel>Publisher</InputLabel>
            <Input name='publisher' value={ this.props.publisher } type='text' onChange={ this.handleChange }/>
          </FormControl>
          </Grid>

        </Grid>

        <Grid item xs={6} s={6} md={6} style={style.left}>

          <Grid item xs={12} md={12}>
            <FormControl  required={true} error={this.props.authorError}>
              <InputLabel>Author</InputLabel>
              <Input name='author' value={ this.props.author } type='text' onChange={ this.handleChange }/>
              {this.props.authorError && <FormHelperText id="name-error-text">Please Enter an author</FormHelperText>}
            </FormControl>
          </Grid>

          <Grid item xs={12} md={12}>
            <Autosuggestlist autocomplete={'on'}  renderNumber={4}/>
          </Grid>
        </Grid>

        <Grid item xs={12} style={style.center}>

            <FormControl  required={true} error={this.props.priceError}>
              <InputLabel>Price</InputLabel>
              <Input
              name='price'
              value={ this.props.price }
              type='text'
              onChange={ this.handleChange }
              startAdornment={<InputAdornment position="start">$</InputAdornment>}
              />
            {this.props.priceError && <FormHelperText id="name-error-text">Please Enter a number</FormHelperText>}
            </FormControl>

          </Grid>

          <Grid item xs={12} style={style.center}>
              <TextField
                id="description"
                label="Description"
                multiline
                rowsMax="4"
                className={classes.textField}
                onChange={ this.handleChangeTextField }
                value={this.props.description}
              />
          </Grid>

          <Grid item xs={12}>
            <Button raised color='primary' style={ style.button } onClick={ this.handleSubmit}>Submit</Button>
          </Grid>

        </Grid>
      </Paper>
      </div>
    );
  }
}

export default TextbookForm;
