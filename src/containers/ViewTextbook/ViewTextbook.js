// ViewTextbook.js

// React
import React, { Component } from 'react';

// APIs
import TextbookApi from '../../api/TextbookApi';

// Material UI
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
import Hidden from 'material-ui/Hidden';
import Card, { CardHeader, CardMedia, CardContent, CardActions } from 'material-ui/Card';
import Slide from 'material-ui/transitions/Slide';
import Button from 'material-ui/Button';

// Assets
import book from '../../assets/images/book.png';

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

const style = {
	container: {
		height: '80vh',
		margin: 'auto',
		width: '90%'
	},
	media: {
		'background-color': '#E8EAF6',
		height: '80vh',
		padding: 60
	},
	picture: {
		height: 'calc(80vh - 120px)'
	},
	infoContainer: {
		padding: 20
	},
	infoBody: {
		height: 'calc(65vh - 40px)'
	},
	infoHeader: {
		height: '10vh'
	},
	infoButton: {
		height: '5vh'
	}
}

class ViewTextbook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textbookResults: []
    };
  }

  handleQuery(bookID) {
    const response = TextbookApi.getOneTextbook(
        bookID)
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

  handleQuerySuccess() {
    const bookData = this.state.textbookResults;
    //const title = bookData["title"];
    if(bookData["_id"] != undefined){
      console.log(bookData);
      const title = bookData["title"];
      const author = bookData["author"];
      return (
        <div>
          <Paper className="ViewTextbook" elevation={20} style={ style.container }>
            <Grid container spacing={0}>

              <Hidden xsDown>
                <Grid item xs={6} style={style.media}>
                  <Card style={ style.picture }>
                    <Paper elevation={12}>
                      <CardMedia 
                        style={ style.picture }
                        image={book}
                        title="Cover Art"
                      />
                    </Paper>
                  </Card>
                </Grid>
              </Hidden>

              <Grid item xs={12} sm={6} md={6} style={style.infoContainer}>
                <Grid container>
                  <Grid item xs={12} style={ style.infoHeader }>
                    <Typography type="title" color="inherit">
                      {title}
                    </Typography>
                    <Typography type="subheading" color="textSecondary">
                      {author}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} style={ style.infoBody }>
                    <Typography type="body1" color="inherit">
                    
                    </Typography>
                  </Grid>

                  <Grid item xs={12} style={ style.infoButton }>
                    <Button raised color="primary" fullWidth={true} style={ style.contactButton }>
                      Purchase Book
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </div>
      );
    } else {
      return(
        <div>
          <Typography component='h2'>No Results</Typography>
        </div>
      );
    }
  }

  render() {
    const bookID = this.props.match.params.bookID;
    this.handleQuery(bookID);

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
        this.handleQuerySuccess()
      );
    }

    
  }
}

export default ViewTextbook;