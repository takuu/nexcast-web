import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import jump from 'jump.js'
import AudioPlayer from '../components/AudioPlayer/AudioPlayer';
import cards from '../../Database.json';
import _ from 'lodash';
import Tag from '../components/Tag/Tag';
import { getEpisodeByKey, getEpisodeById } from '../reducers/showDetail/showDetailActions';
import { getTags } from '../reducers/tag/tagActions';
import { getPodcastById } from '../reducers/podcast/podcastActions';

import { hmsToSecondsOnly } from '../lib/helpers';

// var sound = "http://hwcdn.libsyn.com/p/9/5/0/950f894211e17b78/Part_1_-_Schooled_by_Silicon_Valley.mp3?c_id=12078641&expiration=1494730851&hwt=4da344cb8477fe2203f931507cde8ded";
var sound = "http://www.noiseaddicts.com/samples_1w72b820/2534.mp3";


function onProgress(e) {
  console.log('progress: ', e)
}

var settings = {
  // infinite: true,
  speed: 300,
  slidesToShow: 3,
  // slidesToScroll: 1,
  // centerMode: true,
  vertical: true,
  verticalSwiping: true
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
  const { showDetail, podcastInfo, tags } = state;
  const { podcastId, episodeId } = router.match.params;

  const episodeList = showDetail.toJS()[podcastId];
  const episode = _.find(episodeList, {id: parseInt(episodeId)});
  console.log('episodeList: ', episodeList);

  console.log('tags: ', tags);
  const tagList = tags.toJS()[episodeId];

  return { showDetail: episodeList, episode: episode, podcastInfo: podcastInfo.toJS()[podcastId], tags: tagList };
}, {
  getPodcastById, getEpisodeByKey, getEpisodeById, getTags,
})
class EpisodePage extends Component {
  constructor() {
    super();
    this.goto = this.goto.bind(this);
    this.onStart = this.onStart.bind(this);
    this.onTagHit = this.onTagHit.bind(this);
  }
  componentWillMount() {
    const { podcastId, episodeId } = this.props.match.params;
    this.props.getPodcastById(podcastId);
    this.props.getEpisodeById(episodeId);
    this.props.getTags(episodeId);
    const tesNode = ReactDOM.findDOMNode(this.refs[`card0`]);
  }

  componentWillReceiveProps(nextProps) {
    // debugger;
  }

  onTagHit(num) {
    // debugger;
    if(num >= 0) {
      jump(`#card${num}`, {offset: -220})
    }
  }


  goto(num) {
    const position = _.findLastIndex(cards.cards.result, (item) => {
      return num >= parseInt(item.seconds);
    });

    if(position >= 0) {
      jump(`#card${position}`, {offset: -220})
    }
    // debugger;

  }

  onStart() {
    jump(`#card0`, {offset: -220})
  }



  render() {
    const { classes, showDetail, podcastInfo = {}, episode = {}, tags } = this.props;
    const { podcastId } = this.props.match.params;

    const temp = cards.cards.result;

    const foo = _.sortedUniq(_.map(cards.cards.result, 'seconds'));
    const seconds = _.map(tags, (tag) => { return hmsToSecondsOnly(tag.time)}).sort();



    console.log('EpisodePage: ', this.props, seconds.sort());



    const tagList = _.map(temp, ({ title, description, mediaType, mediaUrl, buttonText1, buttonLink1, buttonText2, buttonLink2, button_link, button_text }, index) => {
      return (
        <div key={index} ref={`card${index}`} id={`card${index}`} style={{padding: '0px 0px 0px 0px'}}>
          <Tag key={index} title={title} description={description} mediaType={mediaType} mediaUrl={mediaUrl} buttonText1={button_text} buttonLink1={button_link} buttonLink2={buttonLink2} buttonText2={buttonText2}></Tag>
        </div>
      )
    });

    return (
      <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'flex-start'}}>
        <div style={{ width: '100%', height: '100px', zIndex: 100, position: 'fixed'}}>
          <AudioPlayer onTagHit={this.onTagHit} onStart={this.onStart} mediaUrl={episode.media_location ? decodeURIComponent(episode.media_location) : sound} duration={episode.duration} tags={foo} title={podcastInfo.title} subTitle={episode.title} />
        </div>
        <div style={{height: '160px', width: '100%'}}></div>
        <div style={{ marginTop: '0px'}}>
          <Grid container spacing={24}>
            <Grid item xs={0} sm={3}>
            </Grid>
            <Grid item xs={12} sm={6}>
{/*              <Slider ref='slider' {...settings}>
                {tagList}
              </Slider>*/}
              {tagList}
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

