// categoryForm.js
import React, { Component } from 'react';
import { withTheme } from 'material-ui/styles';
import Radio, { RadioGroup } from 'material-ui/Radio';
import { FormLabel, FormControl, FormControlLabel, FormHelperText } from 'material-ui/Form';


class CategoryForm extends Component {
  constructor(props) {
    super(props);
    //this.state = { selectionValue: ''};

    this.handleSelection = this.handleSelection.bind(this);
  }


  handleSelection = (event, selectionValue) => {
  this.props.handleSelection(selectionValue);
  };

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
      <div className='categoryForm' style={ classes.root }>
      <FormControl component="fieldset" required className={classes.formControl}>
                <FormLabel component="legend">What are you looking to sell?</FormLabel>
                <RadioGroup
                  aria-label="textbookSelection"
                  name="textbookSelection"
                  className={classes.group}
                  value={this.props.selectionValue}
                  onChange={this.handleSelection}
                >
                  <FormControlLabel value="Textbook" control={<Radio />} label="Textbook" />
                  <FormControlLabel value="Collection" control={<Radio />} label="Collection" />
                </RadioGroup>
              </FormControl>
      </div>
    );
  }
}

export default CategoryForm;
