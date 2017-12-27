import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
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
import theme from '../../styles/theme.css';
import _ from 'lodash';

import { searchPodcastShows } from '../../reducers/search/searchActions';

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
  drawerHeader: theme.mixins.toolbar,
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },

  // Search Bar

});

const KEYS_TO_FILTERS = [ 'title', 'author', 'description'];
const PODCASTS = [
  { title: "Software Engineering", author: 'foobar', description: 'foobaz' },
  { title: "Midlife Crisis", author: 'john', description: 'getting old' },
  { title: "Software Development", author: 'joe', description: '' },
];

@connect((state, router) => {
  const { searchShows } = state;
  const { podcastId } = router.match.params;

  return { searchShows: searchShows.toJS() };
}, {
  searchPodcastShows
})
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

  handleDrawerToggle() {

  }

  render() {
    const { classes, searchShows } = this.props;
    const { value, suggestions } = this.state;
    const navLinkConfig = [
      { name: 'Popular', url: '/popular' },
      { name: 'Queue', url: '/queue' },
    ];
    debugger;

    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      placeholder: 'Search',
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
              <div>
                <Link to={"/"} >
                  <img style={{height: '32px', padding: '5px'}} src={require('../../images/nexcast_logo_dark.png')} alt={`Nexcast`}/>
                </Link>
              </div>

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
