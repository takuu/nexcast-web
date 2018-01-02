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
import _ from 'lodash';

import SearchBar from '../../components/SearchBar/SearchBar';

import { searchPodcastShows } from '../../reducers/search/searchActions';

import CustomDrawer from '../../components/CustomDrawer/CustomDrawer';


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
    this.handleDrawerToggle = this.handleDrawerToggle.bind(this);
    this.state = {openDrawer: false };
  }

  onChange(val) {
    console.log('val: ', val);

  }

  handleDrawerToggle() {
    this.setState({
      openDrawer: !this.state.openDrawer
    });
  }

  render() {
    const { classes } = this.props;
    const [ root, podcast, podcastId, pathname,  ...other ] = this.props.location.pathname.split('/');
    const navLinkConfig = [
      { name: 'Popular', url: '/popular' },
      { name: 'Queue', url: '/queue' },
    ];
    debugger;


    const HIDE_DRAWER_PATH = ['episode'];

    const showDrawer = !!!(HIDE_DRAWER_PATH.find((path) => (path.toLowerCase() === (pathname || '').toLowerCase())));

    let foo = true;
    if(showDrawer) {
      foo = this.state.openDrawer;
    } else {
      foo = false;
    }

    console.log('hideDrawer: ', showDrawer, foo);


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
                <Hidden mdUp>
                  <Link to={"/"} >
                    <img style={{height: '32px', padding: '5px'}} src={require('../../images/nexcast_logo_minimal.png')} alt={`Nexcast`}/>
                  </Link>
                </Hidden>
                <Hidden smDown>
                  <Link to={"/"} >
                    <img style={{height: '32px', padding: '5px'}} src={require('../../images/nexcast_logo_dark.png')} alt={`Nexcast`}/>
                  </Link>
                </Hidden>

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
          {/* mobile */}
          <Hidden mdUp>
            <CustomDrawer subscriptions={[]} show={this.state.openDrawer}></CustomDrawer>
          </Hidden>
          {/* desktop */}
          <Hidden smDown>
            <CustomDrawer subscriptions={[]} show={showDrawer}></CustomDrawer>
          </Hidden>
        </div>
      </div>
    );
  }
}

Header.propTypes = {};
Header.defaultProps = {};

export default withStyles(styles)(Header);
