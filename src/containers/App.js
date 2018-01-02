import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header/Header';
import { renderRoutes } from 'react-router-config';
import Footer from '../components/Footer/Footer';

import { withStyles } from 'material-ui/styles';


const styles = theme => ({
  drawerHeader: theme.mixins.toolbar,
  noDrawer: {
    [theme.breakpoints.down('md')]: {
      marginLeft: '0px !important'
    },
  }
});


const categories = [
  { name: 'Popular', id: 1303 },
  { name: 'Games and Hobbies', id: 1323 },
  { name: 'Sports & Recreation', id: 1316 },
  { name: 'Music', id: 1310 },
  { name: 'Education', id: 1304 },
  { name: 'Business', id: 1321 },
  { name: 'Government & Organization', id: 1325 },
  { name: 'TV & Film', id: 1309 },
  { name: 'Technology', id: 1318 },
];


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
    const { auth, dispatch, params, user, ui, route, classes, match, history } = this.props;
    debugger;

    const [ root, podcast, podcastId,pathname,  ...other ] = this.props.location.pathname.split('/');
    const subscriptions = [
      { name: 'Nexcast', url: '' },
      { name: 'RadioHead', url: '' },
      { name: 'Software Daily Radio', url: '' },
    ];


    const HIDE_DRAWER_PATH = ['episode'];

    const drawerShowing = !!!(HIDE_DRAWER_PATH.find((path) => (path.toLowerCase() === (pathname || '').toLowerCase())));

    return (
      <div style={{ width: '100%' }}>
        <Header match={match} history={history} location={this.props.location} />
        <div className={classes.noDrawer} style={{minHeight: '600px', marginLeft: drawerShowing ? '300px': '0px', marginTop: '75px', width: '100%'}}>

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
