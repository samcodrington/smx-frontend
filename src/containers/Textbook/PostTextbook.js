// PostTextbook.js
import React, { Component } from 'react';

import Grid from 'material-ui/Grid';
import { withTheme } from 'material-ui/styles';

import TextbookApi from '../../api/TextbookApi';
import Typography from 'material-ui/Typography';

//import local components
import CategoryForm from '../../components/postTextbook/CategoryForm';
import CollectionForm from '../../components/postTextbook/CollectionForm';
import TextbookForm from '../../components/postTextbook/TextbookForm';

class PostTextbook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectionValue: '',
      title: '',
      publisher: '',
      author: '',
      course: '',
      price: '',
      priceType: '',
      priceValue: '',
      tags: ''
    };

    this.handleSelection = this.handleSelection.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handlePriceSelection = this.handlePriceSelection.bind(this);
  }

  handleChange(event){
    this.setState({[event.target.name]: event.target.value})
  }

  handleSubmit(event) {
    //alert(JSON.stringify(this.state));
    const textbook = {
      title: this.state.title
    }
    event.preventDefault();
    const response = TextbookApi
    .postTextbook(textbook)
    .then((response) => {alert(response)})
    .catch((response) => {
        alert('Something went wrong: ' + response.status);
    });
  }

  handleSelection(value) {
    this.setState({
    selectionValue: value
    });
  }

  handlePriceSelection(selectionValue){
    this.setState({
    priceType: selectionValue
    });
  if (selectionValue==="SelectPrice"){
    this.state.price = this.state.priceValue;
  }
  else if(selectionValue==="Free"){
    this.state.price = "0";
  }
  else {
    this.state.price = "Please Contact";
  }
  }

  render() {
    var switchFormRender;
      if (this.state.selectionValue==""){
        //render nothing
      }
      else if (this.state.selectionValue=="Textbook"){
        switchFormRender = <TextbookForm
          title = {this.state.title}
          publisher = {this.state.publisher}
          author = {this.state.author}
          course = {this.state.course}
          price = {this.state.price}
          description = {this.state.tags}
          priceValue = {this.state.priceValue}
          priceType = {this.state.priceType}
          handlePriceSelection = {this.handlePriceSelection}
          handleChange = {this.handleChange}
          handleSubmit = {this.handleSubmit}
        />;
      }
      else {
        //add <Collection form
      }
    const classes = {
      root: {
        //backgroundColor: theme.palette.background.default,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
      }
    }
    return (
      <div className='PostTextbook' style={ classes.root }>
        <Grid container spacing={8} alignContent={'center'} alignItems={'center'} justify={'center'}>
          <Grid item xs={12} md={12} align={'center'}>
            <CategoryForm selectionValue={this.state.selectionValue} handleSelection={this.handleSelection}/>
          </Grid>
          <Grid item xs={12} md={12}>
            {switchFormRender}
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default PostTextbook;
