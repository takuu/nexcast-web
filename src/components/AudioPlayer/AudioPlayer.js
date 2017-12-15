import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Slider from 'rc-slider';
import { withStyles } from 'material-ui/styles';
import 'rc-slider/assets/index.css';

// import Play from '../../images/ios-play.svg';
// import Pause from '../../images/ios-pause.svg';

import {Howler} from 'howler';

let playerInfo = {};
var sound = {};

/*
PlayerStatus:
unloaded: 0,
loading: 1,
loaded: 2,
playing: 3,
paused: 4,
stopped: 5,
 */

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




export function secondsToHMS(seconds=0) {
  var start = 11;
  var length = 8;
  if(seconds < 3600) {
    start = 14;
    length = 5;
  }
  return new Date(seconds * 1000).toISOString().substr(start, length);
}

class AudioPlayer extends Component {
  constructor() {
    super();
    this.state = {
      playerStatus: 0,
      duration: 0,
      url: "",
      position: 0,
      intervalId: 0,
    };
    this.onToggle = this.onToggle.bind(this);
    this.play = this.play.bind(this);
    this.start = this.start.bind(this);
    this.pause = this.pause.bind(this);
    this.resume = this.resume.bind(this);
    this.goBack = this.goBack.bind(this);
    this.goForward = this.goForward.bind(this);
    this.seekToTime = this.seekToTime.bind(this);
    this.stop = this.stop.bind(this);
    this.seek = this.seek.bind(this);
    this.moveSeek = this.moveSeek.bind(this);
    this.test = this.test.bind(this);
  }

  onToggle(e) {
  }

  componentWillMount() {
    const { mediaUrl, styleConfig: {progressColor, seekColor, playerColor, controlColor} } = this.props;
    this.start(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.start(nextProps);
  }

  start(props) {
    const { mediaUrl } = props;
    if(playerInfo.mediaUrl != mediaUrl) {
      playerInfo.mediaUrl = mediaUrl;
      this.state.url = mediaUrl;
/*      sound = new Howl({
        src: [mediaUrl],
        volume: 0.1,
        onend: function() {

        }
      });
      this.play();*/
    }

  }

  play() {
    const {mediaUrl} = this.props.player;

    sound.play();
    playerInfo.intervalId = this.state.intervalId = setInterval(() => {

      playerInfo.position = sound.seek();
      this.state.position = sound.seek();

      let status = sound.state();
      let position = 0;
      let duration = 0;
      switch(status) {
        case 'loading':
          this.setState({
            playerStatus: 1,
            duration: 0,
            position: 0,
          });
          break;
        case 'loaded':
          this.setState({
            playerStatus: 3,
            duration: sound.duration(),
            position: sound.seek()
          });
          break;
        default:
          break;
      }

      this.props.onProgress(sound.seek());

    }, 1000);
  }

  pause() {
    const {mediaUrl} = this.props.player;
    clearInterval(this.state.intervalId);
    sound.pause();
    this.setState({
      playerStatus: 2,
    });
    // this.props.actions.playerPause(mediaUrl);
  }

  resume() {
    const {mediaUrl, title, episodeTitle, duration, imageUrl, episodeKey, progress} = this.props.player;
    // this.props.actions.playerResume(mediaUrl, title, episodeTitle, duration, imageUrl, episodeKey, progress);
  }
  goBack() {
    const {position} = this.state;
    this.seek(position - 15);
  }
  goForward() {
    const {position} = this.state;
    this.seek(position + 15);
  }

  seekToTime(percent) {
    const {mediaUrl, title, episodeTitle, duration} = this.props.player;
    //seekToTime
    const sec = (percent/100) * duration;
    if(duration) this.props.actions.playerSeekTo(mediaUrl, sec);
  }

  stop() {
  }
  moveSeek(value) {
    this.setState({
      position: value,
    })
  }

  seek(value) {
    sound.seek(value);
    this.moveSeek(value);
  }

  test() {

  }
  render() {
    const { styleConfig: {progressColor, seekColor, playerColor, controlColor}, tags, duration, classes } = this.props;

    const tagBar = (
      (this.props.tags || []).map((sec, index) => {
        const percent = (sec/duration) * 100;
        console.log('percentage: ', percent);
        return (
          <span key={index} style={{display: 'inline-block', position: 'absolute', left: `${percent}%`, top: 0, width: '3px', height: '20px', backgroundColor: playerColor}}></span>
        )
      })
    );

    debugger;

    return (
      <div>
        <div style={{ width: '100%', height: 200, backgroundColor: playerColor }}>

          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '20px 5px 0px 5px', padding: '5px'}}>
            <span className={classes.playerTitle}>{this.props.title} - {this.props.subTitle}</span>
          </div>

          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '5px', padding: '5px'}}>

            <img src={require("../../images/icon_skip_back.png")} onClick={this.goBack} style={{width: '50px', padding: '2px 10px'}}  />
            {((playerStatus, play, pause) => {
              if (playerStatus == 3) {
                return (
                  <img src={require("../../images/icon_pause.png")} onClick={pause} style={{width: '50px', padding: '2px 10px'}} />
                );
              } else {
                return (
                  <img src={require("../../images/icon_play.png")} onClick={play} style={{width: '50px', padding: '2px 10px'}} />
                )
              }
            })(this.state.playerStatus, this.play, this.pause)}
            <img src={require("../../images/icon_skip_forward.png")} onClick={this.goForward} style={{width: '50px', padding: '2px 10px'}} />

          </div>
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '5px 12px 0px 12px', padding: '5px 2%'}}>
            <span style={{color: 'white'}}>{secondsToHMS(parseInt(this.state.position))}</span>
            <span style={{color: 'white'}}>{secondsToHMS(parseInt(duration))}</span>
          </div>

          <div style={{ width: '96%', margin: '5px 2%', padding: '8px', position: 'relative' }}>
            <div style={{position: 'absolute', width: '100%'}}>

              <Slider
                defaultValue={1}
                step={1}
                min={1}
                value={parseInt(this.state.position)}
                max={parseInt(duration) || 100}
                onChange={this.moveSeek}
                onAfterChange={this.seek}
                maximumTrackStyle={{ backgroundColor: controlColor, height: 10 }}
                railStyle={{ position: 'absolute', width: '100%' }}
                trackStyle={{ position: 'absolute' }}
                minimumTrackStyle={{ backgroundColor: progressColor || 'blue', height: 10, borderRadius: 0, paddingRight: -50, }}
                handleStyle={{
                  borderWidth: 0,
                  height: 28,
                  width: 5,
                  marginLeft: -2,
                  marginTop: -9,
                  borderRadius: 0,
                  borderColor: progressColor,
                  backgroundColor: 'black',
                  position: 'absolute',

                }}
              />
            </div>

            <div style={{width: '100%', height: '0px', top: '0px', position: 'absolute'}}>
              {tagBar}
            </div>
          </div>

        </div>
      </div>
    );
  }
}

AudioPlayer.propTypes = {
  player: PropTypes.object,
  mediaUrl: PropTypes.string,
  title: PropTypes.string,
  subTitle: PropTypes.string,
  onProgress: PropTypes.func,
  styleConfig: PropTypes.objectOf(PropTypes.string),
  duration: PropTypes.number,
  // tags: PropTypes.arrayOf(PropTypes.number),
  // onAction: PropTypes.func,
  // onComplete: PropTypes.func,
};
AudioPlayer.defaultProps = {
  player: {},
  mediaUrl: "",
  title: "",
  subTitle: "",
  onProgress: {},
  styleConfig: {progressColor: 'white', controlColor: '#56a0e5', seekColor: '#56a0e5', playerColor: '#0371d8' },
  tags: [],
  duration: 100,
  // onAction: {},
  // onComplete: {},
};


export default withStyles(styles)(AudioPlayer);

