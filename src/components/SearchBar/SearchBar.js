import React, {Component} from 'react';
import Autosuggest from 'react-autosuggest';
import { withStyles } from 'material-ui/styles';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import theme from '../../styles/theme.css';

import { searchPodcastShows } from '../../reducers/search/searchActions';


@connect((state, router) => {
  const { searchShows } = state;
  console.log('router', router, this);
  debugger;
  return { history: router.history, searchShows: searchShows.toJS() };
}, {
  searchPodcastShows
})
class SearchBar extends Component {
  constructor() {
    super();
    this.onSearch = this.onSearch.bind(this);
    this.state = {
      value: '',
      suggestions: []
    };
  }
  componentWillReceiveProps(nextProps) {
    const { searchShows } = nextProps;

    if( !_.isEqual(searchShows, this.props.searchShows) ) {
      const foo = _.map(searchShows.results, (show) => { return { name: show.collectionName } });
      debugger;
      this.setState({
        suggestions: foo,
      });

    }
  }

  onSearch() {
    console.log('onSearch: ', this.props);
    this.props.history.push(`/search/${this.state.value}`);
    debugger;
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
    const { suggestions, value } = this.state;
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
            renderSuggestion={(suggestion) => (<div style={{cursor: 'pointer', fontSize: '1.2em'}}>{suggestion.name}</div>)}
            inputProps={inputProps}
          />
          <button type="submit" onClick={this.onSearch}><i className="fa fa-search"></i></button>
        </div>
      </div>
    );
  }
}

SearchBar.propTypes = {
  onChange: PropTypes.func,

};
SearchBar.defaultProps = {
  onChange: () => {},
};

export default SearchBar;
