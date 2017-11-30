
if (process.env.BROWSER) require('../styles/global.css');

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
import IconButton from 'material-ui/IconButton';
import Collapse from 'material-ui/transitions/Collapse';
import MenuIcon from 'material-ui-icons/Menu';
import InboxIcon from 'material-ui-icons/MoveToInbox';
import ExpandLess from 'material-ui-icons/ExpandLess';
import ExpandMore from 'material-ui-icons/ExpandMore';
import StarBorder from 'material-ui-icons/StarBorder';

import blue from 'material-ui/colors/blue';
import green from 'material-ui/colors/green';
import red from 'material-ui/colors/red';
import SvgIcon from 'material-ui/SvgIcon';

import HomeIcon from 'material-ui-icons/home';
import SubscriptionIcon from 'material-ui-icons/subscriptions';
import FavoriteIcon from 'material-ui-icons/favorite';


// import CustomModal from '../components/core/CustomModal/CustomModal';


const styles = theme => ({
  drawerHeader: theme.mixins.toolbar,
});


@connect(state => {
    const {auth, router, user, ui} = state;

    return {auth, router, user, ui};
  },
  {

  })
class App extends React.Component {


  render () {
    const { auth, dispatch, params, user, ui, route, classes } = this.props;

    const subscriptions = [
      { name: 'Nexcast', url: '' },
      { name: 'RadioHead', url: '' },
      { name: 'Software Daily Radio', url: '' },
    ];

    const subscriptionList = _.map(subscriptions, ({ name, url}, index) => {
      return (
        <ListItem button key={index}>
          <ListItemAvatar>
            <Avatar alt={name} src={url} ></Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={name}
          />
        </ListItem>
      );
    });

    return (
      <div>
        <Header />
        <Drawer
          type="permanent"
          anchor={'left'}
          open={true}
          classes={{
            paper: classes.drawerPaper,
          }}
          onRequestClose={()=> {}}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          <div>
            <div className={classes.drawerHeader} >
              <ListItem>
                <ListItemText primary={<Typography align='center' type="title" color="default" style={{textTransform: 'uppercase', margin: '5px 20px 0px 0px'}}>Nexcast</Typography>}></ListItemText>
              </ListItem>
            </div>
            <Divider />
            <List>
              <ListItem button>
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                <ListItemText primary="Home" />
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                  <FavoriteIcon />
                </ListItemIcon>
                <ListItemText primary="Popular" />
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                  <SubscriptionIcon />
                </ListItemIcon>
                <ListItemText primary="Subscriptions" />
              </ListItem>
            </List>
            <Divider />
            <List subheader={<ListSubheader>SUBSCRIPTIONS</ListSubheader>}>
              {subscriptionList}
            </List>
          </div>
        </Drawer>
        <div style={{minHeight: '800px', marginLeft: '300px', marginTop: '150px'}}>

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
