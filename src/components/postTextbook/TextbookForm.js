// TextbookForm.js
import React, { Component } from 'react';
import { withTheme } from 'material-ui/styles';
import Radio, { RadioGroup } from 'material-ui/Radio';
import { FormLabel, FormControl, FormControlLabel, FormHelperText } from 'material-ui/Form';
import Input, { InputLabel } from 'material-ui/Input';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';

const style = {
  paper: {
    textAlign: 'center',
    padding: 20
  },
  button: {
    marginTop: 10
  }
}

class TextbookForm extends Component {
  constructor(props) {
    super(props);
    this.state = { priceType: '', priceValue: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handlePriceSelection = this.handlePriceSelection.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  //local change handler (for non-default behaviour)
  handleChange(event){
    this.props.handleChange(event);
  }
  handleSubmit(event){
    this.props.handleSubmit(event);
  }
  //local handle price selection form, and set price prop value
  handlePriceSelection = (event, selectionValue) => {
    this.props.handlePriceSelection(selectionValue);
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

        <Grid item xs={12} md={6}>

          <Grid item xs={12} md={12}>
            <FormControl >
              <InputLabel>Title</InputLabel>
              <Input name='title' value={ this.props.title } type='text' onChange={ this.handleChange }/>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={12}>
          <FormControl >
            <InputLabel>Publisher</InputLabel>
            <Input name='publisher' value={ this.props.publisher } type='text' onChange={ this.handleChange }/>
          </FormControl>
          </Grid>

        </Grid>

        <Grid item xs={12} md={6}>

          <Grid item xs={12} md={12}>
            <FormControl >
              <InputLabel>Author</InputLabel>
              <Input name='author' value={ this.props.author } type='text' onChange={ this.handleChange }/>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={12}>
          <FormControl >
            <InputLabel>Course</InputLabel>
            <Input name='course' value={ this.props.course } type='text' onChange={ this.handleChange }/>
          </FormControl>
          </Grid>

        </Grid>

          <Grid item xs={12} md={12}>

            <Grid item xs={6} md={6} lg={6}>
              <FormControl component="fieldset" required className={classes.formControl}>
                <FormLabel component="legend">Price</FormLabel>
                <RadioGroup
                  aria-label="priceSelection"
                  name="priceSelection"
                  className={classes.group}
                  value={this.props.priceType}
                  onChange={this.handlePriceSelection}
                  >
                  <FormControlLabel value="SelectPrice" control={<Radio />} label="$"/>
                  <FormControlLabel value="Free" control={<Radio />} label="Free" />
                  <FormControlLabel value="PleaseContact" control={<Radio />} label="Please Contact" />
                </RadioGroup>
                </FormControl>
            </Grid>

            <Grid item xs ={6} md={6} lg={6}>
              <Input name='priceValue' value={ this.props.priceValue } type='text' onChange={ this.handleChange }/>
            </Grid>

          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl >
              <TextField
                id="multiline-static"
                label="Description"
                multiline
                rows="4"
                defaultValue=""
                className={classes.textField}
                margin="normal"
                value={this.props.description}
              />
            </FormControl>
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
