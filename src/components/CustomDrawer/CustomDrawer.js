import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Drawer from 'material-ui/Drawer';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';

import List, { ListItem, ListItemAvatar, ListItemIcon, ListItemText, ListSubheader } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import InboxIcon from 'material-ui-icons/MoveToInbox';
import SubscriptionIcon from 'material-ui-icons/Subscriptions';
import FavoriteIcon from 'material-ui-icons/Favorite';
import Divider from 'material-ui/Divider';

const styles = theme => ({
  drawerHeader: theme.mixins.toolbar,
});

class CustomDrawer extends Component {
  constructor() {
    super();
    this.state = {showDrawer: true, drawerType: 'permanent'};
    this.showDrawer = this.showDrawer.bind(this);
  }
  componentWillMount() {
    this.showDrawer(this.props.show);
  }
  componentWillReceiveProps(nextProps) {
    this.showDrawer(nextProps.show);
  }
  showDrawer(show) {
    (show) ?
      this.setState({showDrawer: true, drawerType: 'permanent'}) :
      this.setState({showDrawer: false, drawerType: 'temporary'});
  }
  render() {
    const { classes, subscriptions } = this.props;
    const { showDrawer, drawerType } = this.state;


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
      <Drawer
        type={drawerType}
        anchor={'left'}
        open={showDrawer}
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
    );
  }
}

CustomDrawer.propTypes = {
  subscriptions: PropTypes.arrayOf(PropTypes.object),
  show: PropTypes.bool,
};
CustomDrawer.defaultProps = {
  subscriptions: [],
  show: true,
};

export default withStyles(styles)(CustomDrawer);
