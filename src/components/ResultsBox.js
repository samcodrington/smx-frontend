//ResultsBox.js

import React, { Component } from 'react';

//Import Material-ui components
import GridList from 'material-ui/GridList';
import GridTile from 'material-ui/GridList';

import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';

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

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  handleSubmit(event) {
  }

  handleChange(event) {
  }

  onClick(event) {


  }

  render() {
    //code for dynamically rendering object
    //add properties of textbook
    //var title, price, associatedprogram;
    var results = this.props.results.map(function(textbook){
      //map textbook properties to variables
      //title = textbook.title;
      //price = textbook.price;
      //associatedprogram = textbook.associatedprogram;
      return <Paper elevation={2} style={styles.paper}>
                <Typography type={'title'} style={styles.heading}>{textbook.title}</Typography>
                <Typography type={'subheading'} style={styles.heading}>${textbook.price}|{textbook.associatedprogram}</Typography>
             </Paper>
      //return <GridTile style={styles.gridTile}>
      //          <Paper elevation={2} style={styles.paper}/>
      //      </GridTile>
    });
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
