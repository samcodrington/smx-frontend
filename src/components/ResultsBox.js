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

const styles = {
  paper: {
    textAlign: 'left',
    margin: '12px'
  },
  gridTile : {
    margin: '2px',
    width: '100%'//,
    //backgroundColor: 'red'
  }
};

class ResultsBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      renderLower: 0,   //lower index to render textbook entries
      renderUpper: 10   //Upper index to render textbook entries
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.test = this.test.bind(this);
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

  test(event){
    //alert(JSON.stringify(this.props.results));
    this.setState({
        renderLower: this.state.renderLower+10,
        renderUpper: this.state.renderUpper+10
    });
  }

  //filter function used to limit displayed entries between renderLower and renderUpper indexes
  filter(value,index){
    return (index>=this.state.renderLower && index<=this.state.renderUpper);
  }

  render() {
    //code for dynamically rendering object
    //add properties of textbook
    //var title, price, associatedprogram;
    var results = this.props.results.filter(this.filter).map(function(textbook, index){
      //map textbook properties to variables
      //title = textbook.title;
      //price = textbook.price;
      //associatedprogram = textbook.associatedprogram;
      //return <Card className={5} elevation={2} style={styles.paper} onClick={() => this.handleClick(textbook)}>
      //           <Typography type={'title'} style={styles.heading}>{textbook.title}</Typography>
      //           <Typography type={'subheading'} style={styles.heading}>{textbook.author}|{textbook.associatedprogram}</Typography>
      //        </Card>

      return <ExpansionPanel onClick={this.test}>
                <ExpansionPanelSummary color={'red'} expandIcon={<ExpandMoreIcon />}>
                  <Grid container xs={12} md={12}>
                    <Grid xs={12} md={6}>
                      <Typography type={'title'} style={styles.heading}>{textbook.title}</Typography>
                    </Grid>
                    <Grid xs={6} md={6}>
                      <Typography type={'title'} align={'right'} style={styles.heading}>{index}</Typography>
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
      //return <GridTile style={styles.gridTile}>
      //          <Paper elevation={2} style={styles.paper}/>
      //      </GridTile>
    }.bind(this));//bind function so onClick is visible
    return(
      <div>
        <GridList xs={12} md={12} lg={12} xl={12}
          cols = {1}/*one result spans width of page*/
          >
          {results}{/*dynamically render textbook results*/}
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
