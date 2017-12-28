import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import { Link } from 'react-router-dom';
import { withStyles } from 'material-ui/styles';
import { getEpisodes, getEpisodesById } from '../reducers/showDetail/showDetailActions';
import { getPodcast, getPodcastById } from '../reducers/podcast/podcastActions';
import Button from 'material-ui/Button';

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
    return (
      <Grid container spacing={24}>
        <Grid item xs={12}>
          <Paper className={classes.podcastContainer}>

            <div style={{ width: '100%', display: 'flex', flexDirection: 'row'}}>
              <img src={podcastInfo.image_url} className={classes.podcastImage} style={{height: '250px'}} alt=""/>
              <div>
                <h2 className="paper-list-title">{podcastInfo.title}</h2>
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
        </Grid>
        <Grid item xs={12}>
          <div>
            {showDetail.result.map((episode, index) => (
                <Paper className={classes.episode} spacing={24} key={index}>
                  <div style={{ width: '100%',display: 'flex', flexDirection: 'row' }}>
                    <img src={episode.image_location} height="175" alt=""/>
                    <div style={{ padding: '0px 2%' }}>
                      <Link to={`/podcast/${podcastId}/episode/${episode.episode_key}`} key={index}>
                        <h2 className="paper-list-title">{episode.title}</h2>
                      </Link>
                      <span className="paper-list-text">{episode.subtitle}</span>
                    </div>
                  </div>
                  <div style={{ width: '100%' }}>
                    <h5>{episode.pub_date} - {secondsToHMS(episode.duration)}</h5>
                    <p className="paper-list-text-long">{episode.description_clean}</p>
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
