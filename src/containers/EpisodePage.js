import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import AudioPlayer from '../components/AudioPlayer/AudioPlayer';
import cards from '../../Database.json';
import _ from 'lodash';
import Slider from 'react-slick';
import Tag from '../components/Tag/Tag';
import { getEpisodeByKey } from '../reducers/showDetail/showDetailActions';
import { getPodcastById } from '../reducers/podcast/podcastActions';


// var sound = "http://hwcdn.libsyn.com/p/9/5/0/950f894211e17b78/Part_1_-_Schooled_by_Silicon_Valley.mp3?c_id=12078641&expiration=1494730851&hwt=4da344cb8477fe2203f931507cde8ded";
var sound = "http://www.noiseaddicts.com/samples_1w72b820/2534.mp3";


function onProgress(e) {
  console.log('progress: ', e)
}

var settings = {
  dots: true,
  infinite: true,
  speed: 300,
  slidesToShow: 1,
  slidesToScroll: 1,
  centerMode: true,
  dots: false,
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginTop: 30,
  },
  paper: {
    padding: 16,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  playerTitle: {
    color: '#fff',
    fontSize: '1.5em',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    '-webkitLineClamp': 2,
    '-webkitBoxOrient': 'vertical',
  }
});





@connect((state, router) => {
  const { showDetail, podcastInfo } = state;
  const { podcastId, episodeKey } = router.match.params;

  const episodeList = showDetail.toJS()[podcastId];
  const episode = _.find(episodeList, {episode_key: episodeKey});

  return { showDetail: episodeList, episode: episode, podcastInfo: podcastInfo.toJS()[podcastId] };
}, {
  getPodcastById, getEpisodeByKey
})
class EpisodePage extends Component {
  constructor() {
    super();
    this.goto = this.goto.bind(this);
  }
  componentWillMount() {
    const { podcastId, episodeKey } = this.props.match.params;
    this.props.getPodcastById(podcastId);
    this.props.getEpisodeByKey(episodeKey);
  }

  goto(num) {
    const seconds = _.map(cards.cards.result, 'seconds');
    const position = _.findLastIndex(cards.cards.result, (item) => {
      return num >= parseInt(item.seconds);
    });

    this.refs.slider.slickGoTo(position >= 0 ? position : 0);

  }


  render() {
    const { classes, showDetail, podcastInfo = {}, episode = {} } = this.props;
    const { episodeKey, podcastId } = this.props.match.params;
    const foo = _.map(cards.cards.result, 'seconds');

    const tagList = _.map(cards.cards.result, ({ title, description, mediaType, mediaUrl, buttonText1, buttonLink1, buttonText2, buttonLink2 }, index) => {
      return (
        <div key={index}>
          <Tag key={index} title={title} description={description} mediaType={mediaType} mediaUrl={mediaUrl} buttonText1={buttonText1} buttonLink1={buttonLink1} buttonLink2={buttonLink2} buttonText2={buttonText2}></Tag>
        </div>
      )
    });


    return (
      <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'flex-start'}}>
        <div style={{ width: '100%', height: '100px', zIndex: 100}}>
          <AudioPlayer onProgress={this.goto} mediaUrl={episode.media_location ? decodeURIComponent(episode.media_location) : ''} duration={episode.duration} tags={_.map(cards.cards.result, 'seconds')} title={podcastInfo.title} subTitle={episode.title} />
        </div>
        <div style={{height: '120px', width: '100%'}}></div>
        <div style={{ marginTop: '0px'}}>
          <Grid container spacing={24}>
            <Grid item xs={0} sm={3}>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Slider ref='slider' {...settings}>
                {tagList}
              </Slider>
            </Grid>
            <Grid item xs={0} sm={3}>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

EpisodePage.propTypes = {};
EpisodePage.defaultProps = {};

export default withStyles(styles)(EpisodePage);

