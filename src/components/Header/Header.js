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

import SearchBar from '../../components/SearchBar/SearchBar';

import { searchPodcastShows } from '../../reducers/search/searchActions';


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

class Header extends Component {
  constructor() {
    super();
    this.onChange = this.onChange.bind(this);
  }

  onChange(val) {
    console.log('val: ', val);

  }



  render() {
    const { classes } = this.props;
    const navLinkConfig = [
      { name: 'Popular', url: '/popular' },
      { name: 'Queue', url: '/queue' },
    ];
    debugger;


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

              <SearchBar onChange={this.onChange} history={this.props.history} />



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
