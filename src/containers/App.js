
// if (process.env.BROWSER) require('../styles/global.css');
require('../styles/global.css');

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Header from '../components/Header/Header';
import { Link, Route, Redirect } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import Footer from '../components/Footer/Footer';

import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Hidden from 'material-ui/Hidden';
import Drawer from 'material-ui/Drawer';
import Divider from 'material-ui/Divider';
import List, { ListItem, ListItemAvatar, ListItemIcon, ListItemText, ListSubheader } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import InboxIcon from 'material-ui-icons/MoveToInbox';

import SubscriptionIcon from 'material-ui-icons/Subscriptions';
import FavoriteIcon from 'material-ui-icons/Favorite';


import CustomDrawer from '../components/CustomDrawer/CustomDrawer';



const styles = theme => ({
  drawerHeader: theme.mixins.toolbar,
  noDrawer: {
    [theme.breakpoints.down('md')]: {
      marginLeft: '0px !important'
    },
  }
});


@connect(state => {
    const {auth, router, user, ui} = state;

    return {auth, router, user, ui};
  },
  {

  })
class App extends React.Component {

  componentWillReceiveProps(nextProps) {

  }

  render () {
    const { auth, dispatch, params, user, ui, route, classes } = this.props;

    const [ root, podcast, podcastId,pathname,  ...other ] = this.props.location.pathname.split('/');
    const subscriptions = [
      { name: 'Nexcast', url: '' },
      { name: 'RadioHead', url: '' },
      { name: 'Software Daily Radio', url: '' },
    ];

    const HIDE_DRAWER_PATH = ['episode'];

    const showDrawer = !!!(HIDE_DRAWER_PATH.find((path) => (path.toLowerCase() === (pathname || '').toLowerCase())));

    console.log('hideDrawer: ', showDrawer);

    return (
      <div>
        <Header />
        <Hidden smDown>
          <CustomDrawer subscriptions={subscriptions} show={showDrawer}></CustomDrawer>
        </Hidden>


        <div className={classes.noDrawer} style={{minHeight: '600px', marginLeft: showDrawer ? '300px' : '0px', marginTop: '45px'}}>

          {renderRoutes(route.routes)}
        </div>

        <Footer {...this.props.children} />



      </div>
    );
  }
}

App.propTypes = {
  error: PropTypes.string,
  user: PropTypes.object,
  ui: PropTypes.object
};

App.defaultProps = {
  // route: {},
};

export default withStyles(styles)(App);
