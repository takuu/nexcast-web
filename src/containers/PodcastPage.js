import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import { Link } from 'react-router-dom';
import { withStyles } from 'material-ui/styles';
import { getEpisodes, getEpisodesById } from '../reducers/showDetail/showDetailActions';
import { getPodcast, getPodcastById } from '../reducers/podcast/podcastActions';
import Button from 'material-ui/Button';
import Hidden from 'material-ui/Hidden';

import { secondsToHMS } from '../lib/helpers';
import { episodes, podcast } from '../../Database.json';

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
  const { showDetail, podcastInfo } = state;
  const { podcastId } = router.match.params;

  const detail = showDetail.toJS();

  return { showDetail: showDetail.toJS()[podcastId], podcastInfo: podcastInfo.toJS()[podcastId] };
}, {
  getPodcast, getPodcastById, getEpisodes, getEpisodesById
})
class PodcastPage extends Component {
  constructor() {
    super();
  }
  componentWillMount() {
    const { podcastId } = this.props.match.params;
    this.props.getPodcastById(podcastId);
    this.props.getEpisodesById(podcastId);
  }
  render() {
    let { classes, showDetail = [], podcastInfo = {} } = this.props;
    const { podcastId } = this.props.match.params;

    console.log('PodcastPage: ', podcast, episodes);
    showDetail = episodes.result;
    podcastInfo = podcast.result;
    return (
      <div className="container-fluid">
        <div className="row">
          <Paper className={classes.podcastContainer}>

            <div style={{ width: '100%', display: 'flex', flexDirection: 'row'}}>
              <img src={podcastInfo.image_url} className={classes.podcastImage} style={{height: '250px'}} alt=""/>
              <div>
                <h4 className="paper-list-title">{podcastInfo.title}</h4>
                <span className="paper-list-text">{podcastInfo.artist_name}</span>
                <div style={{ padding: '10px' }}>
                  <Button raised color="primary">Subscribe</Button>
                </div>
              </div>
            </div>
          </Paper>
          <Paper className={classes.podcastContainer}>
            <p>{podcastInfo.description}</p>
          </Paper>
        </div>
        <div className="row">
          {showDetail.map((episode, index) => (
            <Paper className={classes.episode} key={index}>

              <div style={{ width: '100%',display: 'flex', flexDirection: 'row' }}>
                <Hidden smDown>
                  <Link to={`/podcast/${podcastId}/episode/${episode.id}`} key={index}>
                    <img src={episode.image_location} className={classes.podcastImage} height="175" alt=""/>
                  </Link>
                </Hidden>
                <div>
                  <Link to={`/podcast/${podcastId}/episode/${episode.id}`} key={index}>
                    <h5 className="paper-list-title">{episode.title}</h5>
                  </Link>
                  <p className="paper-list-duration">{moment(episode.pub_date).startOf('day').fromNow()} - {secondsToHMS(episode.duration)}</p>
                  <p className="paper-list-text-long">{episode.description_clean}</p>
                </div>
              </div>

            </Paper>
          ))}
        </div>

      </div>
    );
  }
}

PodcastPage.propTypes = {};
PodcastPage.defaultProps = {};

export default withStyles(styles)(PodcastPage);
