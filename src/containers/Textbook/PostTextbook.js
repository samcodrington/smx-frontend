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
      description: '',
      nameError: false,
      authorError: false,
      priceError: false
    };

    this.handleSelection = this.handleSelection.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeTextField = this.handleChangeTextField.bind(this);
  }

  handleChange(event){
    this.setState({[event.target.name]: event.target.value})
  }
  handleChangeTextField(event){
    this.setState({[event.target.id]: event.target.value})
  }

  handleSubmit(event) {
    var dontSend=false
    event.preventDefault();
    //do some basic error checking on entered textbook
    if (this.state.title==""){
      this.setState({nameError: true})
      dontSend=true
    } else {this.setState({nameError: false})}
    if (this.state.author==""){
      this.setState({authorError: true})
      dontSend=true
    } else {this.setState({authorError: false})}
    if (isNaN(this.state.price) || this.state.price==""){
      this.setState({priceError: true})
      dontSend=true
    } else {this.setState({priceError: false})}
    if (!dontSend){
      this.sendTextbook();
      }
  }

  sendTextbook(){
    const textbook = {
      title: this.state.title,
      publisher: this.state.publisher,
      author: this.state.author,
      course: this.state.course,
      price: this.state.price,
      tags: this.state.description
    }
    const response = TextbookApi
    .postTextbook(textbook)
    .then((response) => {alert("You Successfully posted a textbook")})
    .catch((response) => {
        alert('Something went wrong: ' + response.status);
    });
  }

  handleSelection(value) {
    this.setState({
    selectionValue: value
    });
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
          description = {this.state.description}
          nameError = {this.state.nameError}
          authorError = {this.state.authorError}
          priceError = {this.state.priceError}
          handleChange = {this.handleChange}
          handleChangeTextField = {this.handleChangeTextField}
          handleSubmit = {this.handleSubmit}
        />;
      }
      
      else {
        switchFormRender = <CollectionForm
          title = {this.state.title}
          publisher = {this.state.publisher}
          author = {this.state.author}
          course = {this.state.course}
          price = {this.state.price}
          description = {this.state.description}
          nameError = {this.state.nameError}
          authorError = {this.state.authorError}
          priceError = {this.state.priceError}
          handleChange = {this.handleChange}
          handleChangeTextField = {this.handleChangeTextField}
          handleSubmit = {this.handleSubmit}
        />;
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
