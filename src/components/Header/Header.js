import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Link, Route, Redirect } from 'react-router-dom';
import SearchInput, {createFilter} from 'react-search-input'
import Autosuggest from 'react-autosuggest';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Hidden from 'material-ui/Hidden';
import Drawer from 'material-ui/Drawer';
import Divider from 'material-ui/Divider';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import Collapse from 'material-ui/transitions/Collapse';
import MenuIcon from 'material-ui-icons/Menu';

import InboxIcon from 'material-ui-icons/MoveToInbox';
import ExpandLess from 'material-ui-icons/ExpandLess';
import ExpandMore from 'material-ui-icons/ExpandMore';
import StarBorder from 'material-ui-icons/StarBorder';

const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 3,
    width: '100%',
  },
  navIconHide: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  navIconShow: {
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
  headerDesktop: {
    [theme.breakpoints.up('md')]: {
      justifyContent: 'space-between',
    },
    [theme.breakpoints.down('md')]: {
      paddingLeft: '0px !important',
      paddingRight: '0px !important',
    },
  },
  searchBar: {
    color: '#444',
  },
  drawerHeader: theme.mixins.toolbar,
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
});




// Imagine you have a list of languages that you'd like to autosuggest.
const languages = [
  {
    name: 'C',
    year: 1972
  },
  {
    name: 'Elm',
    year: 2012
  },
];

// Teach Autosuggest how to calculate suggestions for any given input value.
const getSuggestions = (value = '') => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0 ? [] : languages.filter(lang =>
    lang.name.toLowerCase().slice(0, inputLength) === inputValue
  );
};

// When suggestion is clicked, Autosuggest needs to populate the input
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
const getSuggestionValue = suggestion => suggestion.name;

// Use your imagination to render suggestions.
const renderSuggestion = suggestion => (
  <div>
    {suggestion.name}
  </div>
);






const KEYS_TO_FILTERS = [ 'title', 'author', 'description'];
const PODCASTS = [
  { title: "Software Engineering", author: 'foobar', description: 'foobaz' },
  { title: "Midlife Crisis", author: 'john', description: 'getting old' },
  { title: "Software Development", author: 'joe', description: '' },
];


class Header extends Component {
  constructor() {
    super();
    this.handleDrawerToggle = this.handleDrawerToggle.bind(this);



    // Autosuggest is a controlled component.
    // This means that you need to provide an input value
    // and an onChange handler that updates this value (see below).
    // Suggestions also need to be provided to the Autosuggest,
    // and they are initially empty because the Autosuggest is closed.
    this.state = {
      value: '',
      suggestions: []
    };
  }
  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
  };

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value)
    });
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  handleDrawerToggle() {

  }

  render() {
    const { classes } = this.props;
    const { value, suggestions } = this.state;
    const navLinkConfig = [
      { name: 'Popular', url: '/popular' },
      { name: 'Queue', url: '/queue' },
    ];

    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      placeholder: 'Type a programming language',
      value,
      onChange: this.onChange
    };

    const navLinks = _.map(navLinkConfig, ({ name, url }, index) => ( <Link key={index} style={{textDecoration: 'none'}} to={url}><Button style={{color: 'white'}}color="default">{name}</Button></Link> ));
    return (
      <div>
        <div>
          <AppBar position="fixed" style={{background: '#fff', zIndex: '1301'}}>
            <Toolbar className={classes.headerDesktop}>
              <Hidden mdUp>
                <IconButton
                  color="contrast"
                  aria-label="open drawer"
                  onClick={this.handleDrawerToggle}
                >
                  <MenuIcon style={{ color: '#444'}} />
                </IconButton>
              </Hidden>
              <div><img style={{height: '32px', padding: '5px'}} src={require('../../images/nexcast_logo_dark.png')} alt={`Nexcast`}/></div>

              <Autosuggest
                suggestions={suggestions}
                onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                getSuggestionValue={getSuggestionValue}
                renderSuggestion={renderSuggestion}
                inputProps={inputProps}
              />

              {/*<div><Typography align='left' type="title" color="default" style={{color: 'white'}}>Nexcast</Typography></div>*/}
              <Hidden smDown>
                <div>
                  {navLinks}
                </div>
              </Hidden>

            </Toolbar>
          </AppBar>
        </div>
      </div>
    );
  }
}

Header.propTypes = {};
Header.defaultProps = {};

export default withStyles(styles)(Header);
