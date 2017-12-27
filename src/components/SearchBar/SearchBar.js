import React, {Component} from 'react';
import Autosuggest from 'react-autosuggest';
import theme from '../../styles/theme.css';
import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';

class SearchBar extends Component {
  constructor() {
    super();
    this.state = {
      value: '',
      suggestions: []
    };
  }
  componentWillReceiveProps(nextProps) {
    const { searchShows } = nextProps;

    if( !_.isEqual(searchShows, this.props.searchShows)) {
      const foo = _.map(searchShows.results, (show) => { return { name: show.collectionName } });
      debugger;
      this.setState({
        suggestions: foo,
      });

    }
  }

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
  };

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  onSuggestionsFetchRequested = ({ value }) => {
    this.props.searchPodcastShows(value);
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };


  render() {
    const { suggestions } = this.state;
    const inputProps = {
      placeholder: 'Search',
      value,
      onChange: this.onChange
    };
    return (
      <div>
        <div className="search-box">
          <Autosuggest
            suggestions={suggestions}
            style={{float: 'left'}}
            theme={theme}
            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
            getSuggestionValue={(suggestion) => suggestion.name}
            renderSuggestion={(suggestion) => (<div>{suggestion.name}</div>)}
            inputProps={inputProps}
          />
          <button type="submit"><i className="fa fa-search"></i></button>
        </div>
      </div>
    );
  }
}

SearchBar.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,

};
SearchBar.defaultProps = {
  value: '',
  onChange: () => {},
};

export default SearchBar;
