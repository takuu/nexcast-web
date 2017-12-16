import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import { withStyles } from 'material-ui/styles';
import _ from 'lodash';
import { GridList, GridListTile, GridListTileBar } from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import StarBorderIcon from 'material-ui-icons/StarBorder';

import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import CategoryList from '../components/CategoryList/CategoryList';


import { getTaggedShows } from '../reducers/taggedShow/taggedShowActions';
import { getPopular, getPodcastByCategoryId } from '../reducers/discover/discoverActions';


const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    // justifyContent: 'space-around',
    overflow: 'hidden',
    flexDirection: 'row',
    background: theme.palette.background.paper,
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
    overflowX: 'scroll',
  },
  gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  title: {
    color: theme.palette.primary[200],
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
  card: {
    maxWidth: 350,
    height: 350,
    margin: '0px 2px'
  },
  media: {
    height: 250,
    width: 250,
  },
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
]

@connect((state, router) => {
  const { taggedShows, popular } = state;
  return { taggedShows, popular: popular.toJS() };
}, {
  getTaggedShows, getPopular, getPodcastByCategoryId
})
class HomePage extends Component {
  constructor() {
    super();
  }
  componentWillMount() {
    console.log('componentWillMount: ', this.props);
    this.props.getTaggedShows();
    // this.props.getPopular();
    _.map(categories, (category) => {
      this.props.getPodcastByCategoryId(category.id);
    });
  }
  render() {
    const { taggedShows, popular, classes } = this.props;
    console.log('HomePage: ', popular);


    return (
      <div style={{padding: '0px 20px'}}>
        <div style={{marginTop: '100px'}}>
          <Typography type="headline" component="h4">
            Recommended
          </Typography>
          <Grid container spacing={24} style={{marginTop: '20px'}}>
            <div className={classes.root}>

              {taggedShows.map(show => (
                <Link to={`/podcast/${show.id}`}>
                  <Card className={classes.card}>
                    <CardMedia
                      className={classes.media}
                      image={show.image_url}
                      title={show.title}
                    />
                    <CardContent>
                      <Typography type="headline" style={{fontSize: '1.2em'}}>
                        {show.title}
                      </Typography>
                      {/*                  <Typography component="p">
                        {show.description}
                      </Typography>*/}
                    </CardContent>
                  </Card>
                </Link>

              ))}

            </div>
          </Grid>
        </div>

        {_.map(categories, (category, index) => {
          return (
            <div style={{marginTop: '100px'}} key={index}>
              <CategoryList name={category.name} podcastList={popular[category.id]}></CategoryList>
            </div>
          )
        })}
      </div>

    );
  }
}

HomePage.propTypes = {
  classes: PropTypes.object.isRequired,
};
HomePage.defaultProps = {};

export default withStyles(styles)(HomePage);


/*
              <GridListTile key={show.image_url}>
                <img src={show.image_url} width={100} height={100} alt={show.title} />
                <GridListTileBar
                  title={show.title}
                  classes={{
                    root: classes.titleBar,
                    title: classes.title,
                  }}
                  actionIcon={
                    <IconButton>
                      <StarBorderIcon className={classes.title} />
                    </IconButton>
                  }
                />
              </GridListTile>


 */