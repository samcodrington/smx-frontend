//ResultsBox.js

import React, { Component } from 'react';

//Import Material-ui components
import GridList from 'material-ui/GridList';
import GridTile from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Star from 'material-ui-icons/Star';
import Grid from 'material-ui/Grid';

const styles = {
  gridTile : {
    margin: '2px',
    width: '100%',
  },
};

class ResultsBox extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
  }

  handleChange(event) {
  }

  render() {
    //code for dynamically rendering object
    //add properties of textbook
    var title;
    var results = this.props.results.map(function(textbook){
      //map textbook properties to variables
      title = textbook.title;
      return <GridTile
              style={styles.gridTile}
            >
            <h1>{title}</h1>
      </GridTile>
    });
    return(
      <div>
        <GridList xs={12} md={12} lg={12} xl={12}
          cols = {1}/*one result spans width of page*/
          cellHeight={'auto'}
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
