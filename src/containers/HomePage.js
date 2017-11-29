import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import { withStyles } from 'material-ui/styles';
import { GridList, GridListTile, GridListTileBar } from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import StarBorderIcon from 'material-ui-icons/StarBorder';

import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';


import { getTaggedShows } from '../reducers/taggedShow/taggedShowActions';
import { getPopular } from '../reducers/discover/discoverActions';


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

@connect((state, router) => {
  const { taggedShows, podcasts } = state;
  return { taggedShows, podcasts };
}, {
  getTaggedShows, getPopular
})
class HomePage extends Component {
  constructor() {
    super();
  }
  componentWillMount() {
    console.log('componentWillMount: ', this.props);
    this.props.getTaggedShows();
    this.props.getPopular();
  }
  render() {
    const { taggedShows, podcasts, classes } = this.props;
    console.log('HomePage: ', taggedShows);

    return (
      <div style={{padding: '0px 20px'}}>
        <div style={{marginTop: '100px'}}>
          <Typography type="headline" component="h4">
            Recommended
          </Typography>
          <Grid container spacing={24} style={{marginTop: '20px'}}>
            <div className={classes.root}>

              {taggedShows.map(show => (
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
              ))}

            </div>
          </Grid>
        </div>
        <div style={{marginTop: '100px'}}>
          <Typography type="headline" component="h4">
            Popular
          </Typography>
          <Grid container spacing={24} style={{marginTop: '20px'}}>
            <div className={classes.root}>
              <br/>

              {podcasts.map(show => (
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.media}
                    image={show.image_url}
                    title={show.title}
                  />
                  <CardContent>
                    <Typography type="headline" component="h4">
                      {show.title}
                    </Typography>
                    {/*                  <Typography component="p">
                    {show.description}
                  </Typography>*/}
                  </CardContent>
                </Card>
              ))}

            </div>

          </Grid>
        </div>
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