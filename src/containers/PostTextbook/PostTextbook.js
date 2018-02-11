// PostTextbook.js

// React
import React, { Component } from 'react';

// Material UI
import Grid from 'material-ui/Grid';
import { withTheme } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';
import Tabs, { Tab } from 'material-ui/Tabs';
import AppBar from 'material-ui/AppBar';

// Components
import CategoryForm from '../../components/postTextbook/CategoryForm';
import CollectionForm from '../../components/postTextbook/CollectionForm';
import TextbookForm from '../../components/postTextbook/TextbookForm';

// APIs
import TextbookApi from '../../api/TextbookApi';

const styles = {
  paperContainer: {
    height: '70vh',
    margin: 'auto',
    width: '80%',
    'z-index': 50
  },
  infoContainer: {
    'padding': 20
  }
}

class PostTextbook extends Component {
  constructor(props) {
    super(props);
    console.log(props.user);
    this.state = {
      selectionValue: '',
      tabval: 0,
      title: '',
      publisher: '',
      author: '',
      course: '',
      number: '',
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
    this.handleChangeAutoSuggest = this.handleChangeAutoSuggest.bind(this);
  }

  handleChange(event){
    this.setState({[event.target.name]: event.target.value})
  }
  handleChangeAutoSuggest(newValue){
    this.setState({course: newValue})
  }
  handleChangeTextField(event){
    this.setState({[event.target.id]: event.target.value})
  }

  handleSubmit(event) {
    alert(this.props.user);
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

  handleSelection(event, tab) {
    this.setState({
    tabval: tab
    });
    console.log(this.state.selectionValue);
  }

  render() {
    var switchFormRender;
      if (this.state.tabval==0){
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
          number = {this.state.number}
          price = {this.state.price}
          description = {this.state.description}
          nameError = {this.state.nameError}
          authorError = {this.state.authorError}
          priceError = {this.state.priceError}
          handleChange = {this.handleChange}
          handleChangeAutoSuggest = {this.handleChangeAutoSuggest}
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
        <Grid container spacing={8}>
          <Grid item xs={12}>
            <Paper className="UserInfo" elevation={5} style={ styles.paperContainer }>
              <AppBar position="static">
                <Tabs value={this.state.tabval} onChange={this.handleChange} fullWidth centered>
                  <Tab label="Textbook" onClick={(event) => this.handleSelection(event, 0)}/>
                  <Tab label="Collection" onClick={(event) => this.handleSelection(event, 1)}/>
                </Tabs>
              </AppBar>
              <Grid container style={ styles.infoContainer } justify={"center"}>
                {switchFormRender}
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default PostTextbook;
