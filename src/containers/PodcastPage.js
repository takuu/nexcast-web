import React, {Component} from 'react';
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
    padding: 1,
    float: 'left',
    // width: 1000,
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    color: theme.palette.text.secondary,
  },
  episode: {
    padding: 8,
    float: 'left',
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    color: theme.palette.text.secondary,
  }
});


const TEMP_SHOW_DETAIL = [{"title":"Supergirl S:3 | Crisis On Earth X, Part 1 E:8 | AfterBuzz TV AfterShow","pub_date":"Tue, 28 Nov 2017 06:00:39 +0000","link":"http://www.afterbuzztv.com/2017/11/27/supergirl-s3-crisis-on-earth-x-part-1-e8-afterbuzz-tv-aftershow/","description":"<p>AFTERBUZZ TV — Supergirl edition, is a weekly &#8220;after show&#8221; for fans of CBS&#8217;s Supergirl. In this episode hosts Stephanie Wenger, Lacretia Lyon, and Joelle Monique discuss episode 8! ABOUT SUPERGIRL: Supergirl is an upcoming American television series developed by writer/producers Greg Berlanti, Ali Adler, Sarah Shechter, and Andrew Kreisberg, set to air on CBS. It [&#8230;]</p>\n<p>The post <a rel=\"nofollow\" href=\"http://www.afterbuzztv.com/2017/11/27/supergirl-s3-crisis-on-earth-x-part-1-e8-afterbuzz-tv-aftershow/\">Supergirl S:3 | Crisis On Earth X, Part 1 E:8 | AfterBuzz TV AfterShow</a> appeared first on <a rel=\"nofollow\" href=\"http://www.afterbuzztv.com\">AfterBuzz TV Network</a>.</p>\n","description_clean":"AFTERBUZZ TV — Supergirl edition, is a weekly “after show” for fans of CBS’s Supergirl. In this episode hosts Stephanie Wenger, Lacretia Lyon, and Joelle Monique discuss episode 8! ABOUT SUPERGIRL: Supergirl is an upcoming American television series developed by writer/producers Greg Berlanti, Ali Adler, Sarah Shechter, and Andrew Kreisberg, set to air on CBS. It […]\nThe post Supergirl S:3 | Crisis On Earth X, Part 1 E:8 | AfterBuzz TV AfterShow appeared first on AfterBuzz TV Network.","duration":2606,"keywords":"","subtitle":"AFTERBUZZ TV — Supergirl edition, is a weekly “after show” for fans of CBS’s Supergirl. In this episode hosts Stephanie Wenger, Lacretia Lyon, and Joelle Monique discuss episode 8! ABOUT SUPERGIRL: Supergirl is an upcoming American television series de...","media_location":"http://podtrac.com/pts/redirect.mp3/audio.afterbuzztv.com/media/wp-content/uploads/2017/11/Supergirl_S03_E08_Mixdown.mp3","image_location":"http://www.afterbuzztv.com/wp-content/uploads/powerpress/Logo_ABTV_2013_06_20.jpg","episode_key":"http://www.afterbuzztv.com/?p=119884"},{"title":"WWE’s Monday Night Raw for November 27th, 2017 | AfterBuzz TV AfterShow","pub_date":"Tue, 28 Nov 2017 05:00:37 +0000","link":"http://www.afterbuzztv.com/2017/11/27/wwes-monday-night-raw-for-november-27th-2017-afterbuzz-tv-aftershow/","description":"<p>AFTERBUZZ TV — WWE&#8217;s Monday Night Raw edition, is a weekly &#8220;after show&#8221; for fans of USA&#8217;s WWE&#8217;s Monday Night Raw. In this episode hosts Markeia McCarty, Ty Matthews, and Jonny Loquasto discuss the matches of the week. RSS Feed: http://afterbuzztv.com/aftershows/wwe-monday-night-raw-afterbuzz-tv-aftershow/feed/ ABOUT WWE&#8217;s MONDAY NIGHT RAW: WWE Raw (also known as WWE Monday Night Raw and advertised [&#8230;]</p>\n<p>The post <a rel=\"nofollow\" href=\"http://www.afterbuzztv.com/2017/11/27/wwes-monday-night-raw-for-november-27th-2017-afterbuzz-tv-aftershow/\">WWE&#8217;s Monday Night Raw for November 27th, 2017 | AfterBuzz TV AfterShow</a> appeared first on <a rel=\"nofollow\" href=\"http://www.afterbuzztv.com\">AfterBuzz TV Network</a>.</p>\n","description_clean":"AFTERBUZZ TV — WWE’s Monday Night Raw edition, is a weekly “after show” for fans of USA’s WWE’s Monday Night Raw. In this episode hosts Markeia McCarty, Ty Matthews, and Jonny Loquasto discuss the matches of the week. RSS Feed: http://afterbuzztv.com/aftershows/wwe-monday-night-raw-afterbuzz-tv-aftershow/feed/ ABOUT WWE’s MONDAY NIGHT RAW: WWE Raw (also known as WWE Monday Night Raw and advertised […]\nThe post WWE’s Monday Night Raw for November 27th, 2017 | AfterBuzz TV AfterShow appeared first on AfterBuzz TV Network.","duration":2792,"keywords":"","subtitle":"AFTERBUZZ TV — WWE’s Monday Night Raw edition, is a weekly “after show” for fans of USA’s WWE’s Monday Night Raw. In this episode hosts Markeia McCarty, Ty Matthews, and Jonny Loquasto discuss the matches of the week. RSS Feed: http://afterbuzztv.","media_location":"http://podtrac.com/pts/redirect.mp3/audio.afterbuzztv.com/media/wp-content/uploads/2017/11/WWE_RAW_2017_11_27_Mixdown.mp3","image_location":"http://www.afterbuzztv.com/wp-content/uploads/powerpress/Logo_ABTV_2013_06_20.jpg","episode_key":"http://www.afterbuzztv.com/?p=119881"},{"title":"Real Housewives of Orange County S:12 | Reunion Part 2 E:21 | AfterBuzz TV AfterShow","pub_date":"Tue, 28 Nov 2017 04:00:26 +0000","link":"http://www.afterbuzztv.com/2017/11/27/real-housewives-of-orange-county-s12-reunion-part-2-e21-afterbuzz-tv-aftershow/","description":"<p>AFTERBUZZ TV — The Real Housewives Of Orange County edition, is a weekly &#8220;after show&#8221; for fans of The Real Housewives Of Orange County. In this episode hosts Lian Castillo and Thomas Orlina discuss episode 21. RSS Feed: http://www.afterbuzztv.com/aftershows/real-housewives-of-orange-county-afterbuzz-tv-aftershow/feed/ ABOUT REAL HOUSEWIVES OF ORANGE COUNTY: A look at five families living in a protected Southern California [&#8230;]</p>\n<p>The post <a rel=\"nofollow\" href=\"http://www.afterbuzztv.com/2017/11/27/real-housewives-of-orange-county-s12-reunion-part-2-e21-afterbuzz-tv-aftershow/\">Real Housewives of Orange County S:12 | Reunion Part 2 E:21 | AfterBuzz TV AfterShow</a> appeared first on <a rel=\"nofollow\" href=\"http://www.afterbuzztv.com\">AfterBuzz TV Network</a>.</p>\n","description_clean":"AFTERBUZZ TV — The Real Housewives Of Orange County edition, is a weekly “after show” for fans of The Real Housewives Of Orange County. In this episode hosts Lian Castillo and Thomas Orlina discuss episode 21. RSS Feed: http://www.afterbuzztv.com/aftershows/real-housewives-of-orange-county-afterbuzz-tv-aftershow/feed/ ABOUT REAL HOUSEWIVES OF ORANGE COUNTY: A look at five families living in a protected Southern California […]\nThe post Real Housewives of Orange County S:12 | Reunion Part 2 E:21 | AfterBuzz TV AfterShow appeared first on AfterBuzz TV Network.","duration":1970,"keywords":"","subtitle":"AFTERBUZZ TV — The Real Housewives Of Orange County edition, is a weekly “after show” for fans of The Real Housewives Of Orange County. In this episode hosts Lian Castillo and Thomas Orlina discuss episode 21. RSS Feed: http://www.afterbuzztv.","media_location":"http://podtrac.com/pts/redirect.mp3/audio.afterbuzztv.com/media/wp-content/uploads/2017/11/RHOC_S12_E21_Mixdown.mp3","image_location":"http://www.afterbuzztv.com/wp-content/uploads/powerpress/Logo_ABTV_2013_06_20.jpg","episode_key":"http://www.afterbuzztv.com/?p=119880"}];

const TEMP_PODCAST_INFO = {"id":398382980,"title":"AfterBuzz TV Network AfterShows","feed_url":"http://www.afterbuzztv.com/aftershows/feed/","description":"The Worldwide Leader in TV Discussion","image_url":"http://is2.mzstatic.com/image/thumb/Music/v4/66/d4/e1/66d4e168-51f3-16ac-02d6-555fcb3f17d2/source/100x100bb.jpg","email":"","verified":null,"artist_name":"AfterBuzz TV Network","release_date":"2017-10-26T19:00:00.000Z","artist_image_url":"https://itunes.apple.com/us/artist/afterbuzz-tv/id407139777?mt=2&uo=4","primary_genre_id":1309,"created_at":"2017-05-19T02:17:28.991Z","updated_at":"2017-10-27T06:00:12.734Z"};

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
    podcastInfo = podcast.result;
    showDetail = episodes.result;
    return (
      <div style={{width: '99%'}}>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <Paper className={classes.podcastContainer}>
              <img src={podcastInfo.image_url} className={classes.podcastImage} style={{height: '250px'}} alt=""/>
              <div style={{ padding: '0px 5%', width: '100%' }}>
                <h2>{podcastInfo.title}</h2>
                <h4>{podcastInfo.artist_name}</h4>
                <div style={{ padding: '10px' }}>
                  <Button raised color="primary">Subscribe</Button>
                </div>
              </div>
            </Paper>
            <Paper className={classes.podcastContainer}>
              <p>{podcastInfo.description}</p>
            </Paper>

          </Grid>
          <Grid item xs={12}>
            <div>
              {showDetail.map((episode, index) => (
                <Link to={`/podcast/${podcastId}/episode/${episode.episode_key}`} key={index}>
                  <Paper className={classes.episode} spacing={24} key={index}>
                    <img src={episode.image_location} height="100" alt=""/>
                    <div style={{ padding: '0px 5%' }}>
                      <h2>{episode.title}</h2>
                      <h4>{episode.subtitle}</h4>
                      <h5>{episode.pub_date} - {secondsToHMS(episode.duration)}</h5>
                      <p>{episode.description_clean}</p>
                    </div>
                  </Paper>
                </Link>

              ))}
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

PodcastPage.propTypes = {};
PodcastPage.defaultProps = {};

export default withStyles(styles)(PodcastPage);
