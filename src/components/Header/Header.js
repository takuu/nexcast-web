import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Link, Route, Redirect } from 'react-router-dom';
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
  drawerHeader: theme.mixins.toolbar,
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
});


class Header extends Component {
  constructor() {
    super();
    this.handleDrawerToggle = this.handleDrawerToggle.bind(this);
  }

  handleDrawerToggle() {

  }

  render() {
    const { classes } = this.props;
    const navLinkConfig = [
      { name: 'Popular', url: '/popular' },
      { name: 'Queue', url: '/queue' },
    ];
    const navLinks = _.map(navLinkConfig, ({ name, url }, index) => ( <Link key={index} style={{textDecoration: 'none'}} to={url}><Button style={{color: 'white'}}color="default">{name}</Button></Link> ));
    return (
      <div>
        <div>
          <AppBar position="fixed" style={{background: '#fff'}}>
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
