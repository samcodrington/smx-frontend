//ResultsBox.js

import React, { Component } from 'react';

//Import Material-ui components
import GridList from 'material-ui/GridList';
import GridTile from 'material-ui/GridList';
import Grid from 'material-ui/Grid'

import Paper from 'material-ui/Paper';
import Card, {CardActions} from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import ExpansionPanel, {ExpansionPanelSummary, ExpansionPanelDetails} from 'material-ui/ExpansionPanel';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import Button from 'material-ui/Button';

const styles = {
  paper: {
    textAlign: 'left',
    margin: '12px'
  },
  gridTile : {
    margin: '2px',
    width: '100%'//,
    //backgroundColor: 'red'
  },
  grid : {
    height: '100%'
  },
  button: {
    marginTop: '10px',
    marginRight: '10px'
  }
};

class ResultsBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.changeShownResults = this.changeShownResults.bind(this);
    this.filter = this.filter.bind(this);
  }

  handleSubmit(event) {
  }

  handleChange(event) {
  }

  handleClick(textbook) {
    alert(textbook.title)
    //generate results page here
  }

  changeShownResults(goForward){
    this.props.changeShownResults(goForward);
  }

  //filter function used to limit displayed entries between renderLower and renderUpper indexes
  filter(value,index){
    return (index>=this.props.renderLower && index<=this.props.renderUpper);
  }

  render() {
    //code for dynamically rendering object
    //filter function limits number of generated results block
    //map function maps textbook objects to a rendered component
    var results = this.props.results.filter(this.filter).map(function(textbook, index){
      return <ExpansionPanel>
                <ExpansionPanelSummary color={'red'} expandIcon={<ExpandMoreIcon />}>
                  <Grid container xs={12} md={12}>
                    <Grid xs={12} md={6}>
                      <Typography type={'title'} style={styles.heading}>{textbook.title}</Typography>
                    </Grid>
                    <Grid xs={6} md={6}>
                      <Typography type={'title'} align={'right'} style={styles.heading}>{textbook.price}</Typography>
                    </Grid>
                    <Grid xs={6} md={12}>
                      <Typography type={'subheading'} style={styles.heading}>{textbook.author}|{textbook.associatedprogram}</Typography>
                    </Grid>
                  </Grid>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <Typography>
                    Add star entry and message seller component here
                  </Typography>
                </ExpansionPanelDetails>
            </ExpansionPanel>
    }.bind(this));//bind function so onClick is visible
    return(
      <div>
        <GridList xs={12} md={12} lg={12} xl={12}
          cols = {1}/*one result spans width of page*/
          >
          <Grid xs={12} style={styles.grid}>
          {this.props.results.length>0 &&<Button raised color='primary' disabled={this.props.disablePrevButton} style={ styles.button } onClick={() => this.changeShownResults(false)}>Prev</Button>}
          {this.props.results.length>0 &&<Button raised color='primary' disabled={this.props.disableNextButton} style={ styles.button } onClick={() => this.changeShownResults(true)}>Next</Button>}
          {this.props.results.length>0 && <div> Showing {this.props.renderLower+1}-{this.props.renderUpper} of {this.props.results.length} results </div>}
          </Grid>
          <Grid xs={12} style={styles.grid}>
            {results}{/*dynamically render textbook results*/}
          </Grid>
        </GridList>
      </div>
    );
  }
};

// return <GridTile>
//     <Grid xs={12} s={12} md={12} lg={12} xl={12}>
//       <h1>{title}</h1>
//     </Grid>
// </GridTile>
// });



export default ResultsBox;
