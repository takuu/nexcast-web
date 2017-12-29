import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import { Link } from 'react-router-dom';
import { withStyles } from 'material-ui/styles';

import { secondsToHMS } from '../lib/helpers';
import { search } from '../../Database.json';
import {searchPodcastShows} from "../reducers/search/searchActions";

const styles = theme => ({
  drawerHeader: theme.mixins.toolbar,
  root: {
    flexGrow: 1,
    marginTop: 30,
  },
  podcastImage: {
    [theme.breakpoints.down('md')]: {
      height: '100px !important'
    },
  },
  podcastContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    color: theme.palette.text.secondary,
  },
  episode: {
    padding: 8,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    color: theme.palette.text.secondary,
  }
});

@connect((state, router) => {
  const { searchShows } = state;
  const { term } = router.match.params;

  return { searchShows: searchShows.toJS() };
}, {
  searchPodcastShows
})
class PodcastPage extends Component {
  constructor() {
    super();
  }
  componentWillMount() {
    const { term } = this.props.match.params;
    this.props.searchPodcastShows(term)
  }
  render() {
    let { classes, searchShows } = this.props;
    const { podcastId } = this.props.match.params;

    // searchShows = search;

    debugger;
    return (
      <Grid container spacing={24}>
        <Grid item xs={12}>
          <div>
            {searchShows.result && searchShows.result.map((podcast, index) => (
              <Paper className={classes.episode} spacing={24} key={index}>
                <div style={{ width: '100%',display: 'flex', flexDirection: 'row' }}>
                  <Link to={`/podcast/${podcast.collectionId}`} key={index}>
                    <img src={podcast.artworkUrl600} height="175" alt=""/>
                  </Link>
                  <div style={{ padding: '0px 2%' }}>
                    <Link to={`/podcast/${podcast.collectionId}`} key={index}>
                      <h2 className="paper-list-title">{podcast.trackName}</h2>
                    </Link>
                    <span className="paper-list-text">{podcast.artistName}</span>
                  </div>
                </div>
                <div style={{ width: '100%' }}>
                  <h5></h5>
                  <p className="paper-list-text-long"></p>
                </div>
              </Paper>
            ))}
          </div>
        </Grid>
      </Grid>
    );
  }
}

PodcastPage.propTypes = {};
PodcastPage.defaultProps = {};

export default withStyles(styles)(PodcastPage);
