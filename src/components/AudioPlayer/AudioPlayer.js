import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Slider from 'rc-slider';
import { withStyles } from 'material-ui/styles';
// import 'rc-slider/assets/index.css';

// import Play from '../../images/ios-play.svg';
// import Pause from '../../images/ios-pause.svg';

import {Howler} from 'howler';

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
      position: 0,
      intervalId: 0,
      mediaUrl: '',
    };
    this.play = this.play.bind(this);
    this.start = this.start.bind(this);
    this.pause = this.pause.bind(this);
    this.resume = this.resume.bind(this);
    this.goBack = this.goBack.bind(this);
    this.goForward = this.goForward.bind(this);
    this.stop = this.stop.bind(this);
    this.seek = this.seek.bind(this);
    this.moveSeek = this.moveSeek.bind(this);
    this.test = this.test.bind(this);
  }

  componentWillMount() {
    const { mediaUrl, styleConfig: {progressColor, seekColor, playerColor, controlColor} } = this.props;
    // this.start(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.mediaUrl && this.state.intervalId == 0) this.start(nextProps);
  }

  componentWillUnmount() {
    sound.unload();
  }

  start(props) {
    const { mediaUrl, tags } = props;
    if(mediaUrl && this.state.mediaUrl != mediaUrl) {

      console.log('initiate Howler: ', mediaUrl);
      this.props.onStart();
      this.setState({
        ...this.state,
        mediaUrl,
        playerStatus: 1,
      });
      sound = new Howl({
        src: [mediaUrl],
        volume: 1,
        onend: function() {

        }
      });
      sound.once('load', () => {
        this.play();
      });

      sound.on('play', () => {
        clearInterval(this.state.intervalId);



        const intervalId = setInterval(() => {

          let status = sound.state();

          console.log('Howler status: ', status);

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

          // this.props.onProgress(sound.seek());

          const position = _.findLastIndex(this.props.tags, (sec) => {
            return parseInt(sound.seek()) == parseInt(sec);
          });
          if(position >= 0) this.props.onTagHit(position);

        }, 1000);

        this.setState({
          ...this.state,
          playerStatus: 3,
          intervalId
        });
      });

      // this.play();


    }

  }

  play() {

    console.log('play is pending');
    sound.play();
    this.setState({
      ...this.state,
      playerStatus: 3,
    })

  }

  pause() {
    clearInterval(this.state.intervalId);
    sound.pause();
    this.setState({
      ...this.state,
      playerStatus: 2,
    });
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

  stop() {
  }
  moveSeek(value) {
    this.setState({
      ...this.state,
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

    const tagBar =
      (this.props.tags || []).map((sec, index) => {
        const percent = (sec/duration) * 100;
        return (
          <span key={index} style={{display: 'inline-block', position: 'absolute', left: `${percent}%`, top: '20px', width: '3px', height: '20px', backgroundColor: playerColor}}></span>
        )
      });


    return (
      <div>
        <div style={{ width: '100%', backgroundColor: playerColor, padding: '5px 0px' }}>

          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0px 5px 0px 5px', padding: '5px'}}>
            <span className={classes.playerTitle}>{this.props.title} - {this.props.subTitle}</span>
          </div>

          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>

            <img src={require("../../images/icon_skip_back.png")} onClick={this.goBack} style={{width: '50px', padding: '2px 10px'}}  />
            {((playerStatus, play, pause) => {
              if (playerStatus == 3) {
                return (
                  <img src={require("../../images/icon_pause.png")} onClick={pause} style={{width: '50px', padding: '2px 10px'}} />
                );
              } else if (playerStatus == 1) {
                return (
                  <div className="spinner" style={{ width: '50px', height: '50px'}} onClick={play}>
                    <div className="rect1"></div>
                    {/*<div className="rect2"></div>*/}
                    <div className="rect3"></div>
                    {/*<div className="rect4"></div>*/}
                    <div className="rect5"></div>
                  </div>
                )
              } else {
                return (
                  <img src={require("../../images/icon_play.png")} onClick={play} style={{width: '50px', padding: '2px 10px'}} />
                )
              }
            })(this.state.playerStatus, this.play, this.pause)}
            <img src={require("../../images/icon_skip_forward.png")} onClick={this.goForward} style={{width: '50px', padding: '2px 10px'}} />

          </div>
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '0px 12px', padding: '0px 2%'}}>
            <span style={{color: 'white'}}>{secondsToHMS(parseInt(this.state.position))}</span>
            <span style={{color: 'white'}}>{secondsToHMS(parseInt(duration))}</span>
          </div>

          <div style={{ width: '96%', margin: '5px 2%', padding: '25px', position: 'relative' }}>
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
  onTagHit: PropTypes.func,
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
  onTagHit: {},
  styleConfig: {progressColor: 'white', controlColor: '#56a0e5', seekColor: '#56a0e5', playerColor: '#0371d8' },
  tags: [],
  duration: 100,
  // onAction: {},
  // onComplete: {},
};


export default withStyles(styles)(AudioPlayer);

