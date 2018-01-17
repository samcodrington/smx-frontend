import React from 'react';
import PropTypes from 'prop-types';
import Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import { MenuItem } from 'material-ui/Menu';
import { withStyles } from 'material-ui/styles';

const suggestions = [
  { label: 'APSC 100' },
  { label: 'APSC 111' },
  { label: 'APSC 112' },
  { label: 'APSC 131' },
  { label: 'APSC 132' },
  { label: 'APSC 142' },
  { label: 'APSC 151' },
  { label: 'APSC 161' },
  { label: 'APSC 171' },
  { label: 'APSC 172' },
  { label: 'APSC 174' },
  { label: 'ELEC 221' },
  { label: 'ELEC 252' },
  { label: 'ELEC 270' },
  { label: 'ELEC 271' },
  { label: 'ELEC 274' },
  { label: 'ELEC 278' },
  { label: 'ELEC 280' },
  { label: 'ELEC 299' },
  { label: 'CMPE 212' },
  { label: 'MTHE 235' },
  { label: 'APSC 200' },
  { label: 'APSC 293' },
  { label: 'CMPE 365' },
  { label: 'CMPE 380' },
  { label: 'ELEC 326' },
  { label: 'ELEC 371' },
  { label: 'ELEC 373' },
  { label: 'ELEC 374' },
  { label: 'ELEC 377' },
  { label: 'ELEC 390' },
  { label: 'APSC 221' },
  { label: 'CMPE 223' },
  { label: 'CMPE 320' },
  { label: 'ELEC 498' },
  { label: 'ELEC 273' },
  { label: 'ELEC 323' },
  { label: 'ELEC 324' },
  { label: 'ELEC 344' },
  { label: 'ELEC 353' },
  { label: 'ELEC 408' },
  { label: 'ELEC 409' },
  { label: 'ELEC 421' },
  { label: 'ELEC 422' },
  { label: 'ELEC 431' },
  { label: 'ELEC 443' },
  { label: 'ELEC 444' },
  { label: 'ELEC 448' },
  { label: 'ELEC 451' },
  { label: 'ELEC 461' },
  { label: 'ELEC 464' },
  { label: 'ELEC 470' },
  { label: 'ELEC 474' },
  { label: 'ELEC 478' },
  { label: 'ELEC 497' },
  { label: 'ENPH 336' },
  { label: 'CHEE 400' },
  { label: 'CMPE 327' },
  { label: 'CMPE 434' },
  { label: 'CMPE 452' },
  { label: 'CMPE 457' },
  { label: 'CMPE 458' },
  { label: 'SOFT 437' },
  { label: 'CMPE 204' },
  { label: 'CMPE 322' },
  { label: 'CMPE 325' },
  { label: 'CMPE 326' },
  { label: 'CMPE 332' },
  { label: 'CMPE 333' },
  { label: 'CMPE 422' },
  { label: 'CMPE 425' },
  { label: 'CMPE 432' },
  { label: 'CMPE 454' },
  { label: 'SOFT 423' }
];

function sortSuggestions(a,b) {
  if (a.label < b.label){
    return -1;
  }
  if (a.label > b.lable){
    return 1;
  }
  return 0;
}

function renderInput(inputProps) {
  const { classes, autoFocus, value, ref, ...other } = inputProps;

  return (
    <TextField
      autoFocus={autoFocus}
      className={classes.textField}
      value={value}
      inputRef={ref}
      InputProps={{
        classes: {
          input: classes.input,
        },
        ...other,
      }}
    />
  );
}

function renderSuggestion(suggestion, { query, isHighlighted }) {
  const matches = match(suggestion.label, query);
  const parts = parse(suggestion.label, matches);

  return (
    <MenuItem selected={isHighlighted} component="div">
      <div>
        {parts.map((part, index) => {
          return part.highlight ? (
            <span key={String(index)} style={{ fontWeight: 300 }}>
              {part.text}
            </span>
          ) : (
            <strong key={String(index)} style={{ fontWeight: 500 }}>
              {part.text}
            </strong>
          );
        })}
      </div>
    </MenuItem>
  );
}

function renderSuggestionsContainer(options) {
  const { containerProps, children } = options;

  return (
    <Paper {...containerProps} square>
      {children}
    </Paper>
  );
}

function getSuggestionValue(suggestion) {
  return suggestion.label;
}

function getSuggestions(value) {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;
  let count = 0;

  return inputLength === 0
    ? []
    : suggestions.sort(sortSuggestions).filter(suggestion => {
        const keep =
          count < 5 && suggestion.label.toLowerCase().slice(0, inputLength) === inputValue;

        if (keep) {
          count += 1;
        }

        return keep;
      });
}

const styles = theme => ({
  container: {
    flexGrow: 1,
    position: 'relative',
    height: 200,
  },
  suggestionsContainerOpen: {
    position: 'absolute',
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit * 3,
    left: 0,
    right: 0,
  },
  suggestion: {
    display: 'block',
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
  },
  textField: {
    width: '100%',
  },
});

class IntegrationAutosuggest extends React.Component {
  state = {
    value: '',
    suggestions: [],
  };

  handleSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value),
    });
  };

  handleSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    });
  };

  handleChange = (event, { newValue }) => {
    this.setState({
      value: newValue,
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <Autosuggest
        theme={{
          container: classes.container,
          suggestionsContainerOpen: classes.suggestionsContainerOpen,
          suggestionsList: classes.suggestionsList,
          suggestion: classes.suggestion,
        }}
        renderInputComponent={renderInput}
        suggestions={this.state.suggestions}
        onSuggestionsFetchRequested={this.handleSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.handleSuggestionsClearRequested}
        renderSuggestionsContainer={renderSuggestionsContainer}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={{
          autoFocus: true,
          classes,
          placeholder: 'Search a country (start with a)',
          value: this.state.value,
          onChange: this.handleChange,
        }}
      />
    );
  }
}

IntegrationAutosuggest.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(IntegrationAutosuggest);
