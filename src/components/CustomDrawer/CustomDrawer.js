import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Drawer from 'material-ui/Drawer';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';

import List, { ListItem, ListItemAvatar, ListItemIcon, ListItemText, ListSubheader } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import InboxIcon from 'material-ui-icons/MoveToInbox';
import SubscriptionIcon from 'material-ui-icons/Subscriptions';
import FavoriteIcon from 'material-ui-icons/Favorite';
import GameIcon from 'material-ui-icons/VideogameAsset';
import SportIcon from 'material-ui-icons/Motorcycle';
import MusicIcon from 'material-ui-icons/MusicNote';
import EducationIcon from 'material-ui-icons/LaptopChromebook';
import BusinessIcon from 'material-ui-icons/Business';
import GovernmentIcon from 'material-ui-icons/Gavel';
import TvIcon from 'material-ui-icons/Tv';
import TechIcon from 'material-ui-icons/LightbulbOutline';

import { camelize } from "../../lib/helpers";

import Divider from 'material-ui/Divider';



const categories = [
  { name: 'Popular', id: 1303, icon: FavoriteIcon, url: '/#popular' },
  { name: 'Games and Hobbies', id: 1323, icon: GameIcon, url: '/#gamesAndHobbies' },
  { name: 'Music', id: 1310, icon: MusicIcon, url: '/#music' },
  { name: 'Education', id: 1304, icon: EducationIcon, url: '/#education' },
  { name: 'Business', id: 1321, icon: BusinessIcon, url: '/#business' },
  { name: 'Sports & Recreation', id: 1316, icon: SportIcon, url: '/#sports&Recreation' },
  { name: 'Government & Organization', id: 1325, icon: GovernmentIcon, url: '/#government&Organization' },
  { name: 'TV & Film', id: 1309, icon: TvIcon, url: '/#tv&Film' },
  { name: 'Technology', id: 1318, icon: TechIcon, url: `/#technology` },
];



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


    const sideList = subscriptions.length ? _.map(subscriptions, ({ name, url}, index) => {
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
    }) :
      _.map(categories, (item, index) => {
        return (
          <Link to={item.url} key={index}>
            <ListItem button >
              <ListItemIcon>
                <item.icon></item.icon>
              </ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItem>
          </Link>

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
          <List subheader={<ListSubheader>CATEGORIES</ListSubheader>}>
            {sideList}
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
