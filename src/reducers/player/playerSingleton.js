'use strict';
// import { ReactNativeAudioStreaming } from 'react-native-audio-streaming';
import Expo, { Asset, Audio, Font, Video } from 'expo';
Audio.setAudioModeAsync({
  allowsRecordingIOS: false,
  interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
  playsInSilentLockedModeIOS: true,
  shouldDuckAndroid: true,
  interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
});
let playbackInstance;
let ReactNativeAudioStreaming = {
  pause: () => {},
  stop: () => {},
  start: () => {},
  resume: () => {
    playbackInstance.playAsync();
  },
  play: (source) => {
    //ReactNativeAudioStreaming.play(episode.mediaUrl, {showIniOSMediaCenter: true, showInAndroidNotifications: true, title: episode.title, artist: episode.episodeTitle,elapsedPlaybackTime: episode.progress || 0, duration: episode.duration, artwork: episode.imageUrl});
    // _start(source);
  },
  getStatus: () => {},
  seekToTime: () => {},
  goForward: () => {},
  goBack: () => {},
};


async function _start(dispatch, ep = {}) {
  let instance;
  try {
    const initialStatus = {
      shouldPlay: true,
      rate: 1.0,
      shouldCorrectPitch: true,
      volume: 1.0,
      isMuted: false,
      isLooping: false,
    }
    const {sound , status} = await Audio.Sound.create(
      { uri: ep.mediaUrl || '' },
      { shouldPlay: true },
    );
    sound.setCallback(_callback);

    instance = sound;
  } catch(err) {
    console.log('playerSingleton err _start: ', err);
  }

  function _callback(status) {
    currentProgress++;

    let progress = parseInt(status.positionMillis/1000);
    let duration = parseInt(status.durationMillis/1000);
    let episode = {mediaUrl: status.uri, playerStatus: (status.isPlaying) ? 1 : 2, duration: duration, lastPlayed: (new Date()).toDateString(),
      progress: progress, title: ep.episodeTitle, episodeTitle: ep.episodeTitle, imageUrl: '', episodeKey: ep.episodeKey};

    dispatch(playerResumeSuccess(episode));
    dispatch(setPodcastHistoryRequest());

    podcastHistoryStorage.setHistory(episode).then((history) => {
      dispatch(setPodcastHistorySuccess(history));
    });

    if (progress + 1 > duration) {

      try {
        _stopInterval();
        var foo = podcastHistoryActions.removePodcastHistory({mediaUrl: status.uri});
        foo(dispatch);
        var boo = podcastHistoryActions.getNextPodcastHistory({mediaUrl: status.uri});
        boo(dispatch).then((next) => {
          //playerStart(url, title='', episodeTitle='', duration, imageUrl, episodeKey='', progress=0) {
          var bar = playerActions.playerStart(next.mediaUrl, next.title, next.episodeTitle, next.duration, next.imageUrl, next.episodeKey, next.progress);
          bar(dispatch);
        })

      } catch (error) {
        console.log('getNextPodcastHistory PodcastHistory error: ', error);
      }
    }
  }

  return instance;
}




import { DeviceEventEmitter } from 'react-native';
import {AsyncStorage} from 'react-native';
import MusicListener from '../../lib/MusicListener';
import _ from 'lodash';
// import MusicControl from 'react-native-music-control';
// import MusicControl from 'react-native-player-lockscreen';
import * as podcastHistoryStorage from '../podcastHistory/podcastHistoryStorage';
import * as podcastHistoryActions from '../podcastHistory/podcastHistoryActions';
import * as playerActions from './playerActions';

const {
  PLAYER_RESUME_REQUEST,
  PLAYER_RESUME_SUCCESS,
  PLAYER_RESUME_FAILURE,
  SET_PODCAST_HISTORY_REQUEST,
  SET_PODCAST_HISTORY_SUCCESS,

  PLAYER_START_SUCCESS,
  GET_NEXT_PODCAST_HISTORY_SUCCESS,
} = require('../../lib/constants').default;
const HISTORY_KEY = 'HISTORY_STORAGE';
let interval = -1337;
let currentProgress = 0;




export function removePodcastHistorySuccess (json) { return { type: SET_PODCAST_HISTORY_SUCCESS, payload: json }}
export function playerStartSuccess (json) { return { type: PLAYER_START_SUCCESS, payload: json }}

export function playerResumeRequest (json) { return { type: PLAYER_RESUME_REQUEST, payload: json }}
export function playerResumeSuccess (json) { return { type: PLAYER_RESUME_SUCCESS, payload: json }}
export function playerResumeFailure (json) { return { type: PLAYER_RESUME_FAILURE, payload: json }}

export function setPodcastHistoryRequest (json) { return { type: SET_PODCAST_HISTORY_REQUEST, payload: json }}
export function setPodcastHistorySuccess (json) { return { type: SET_PODCAST_HISTORY_SUCCESS, payload: json }}

export function playerNextPodcastSuccess (json) { return { type: GET_NEXT_PODCAST_HISTORY_SUCCESS, payload: json }}


// ReactNativeAudioStreaming.enableBackgroundMode(true);
// ReactNativeAudioStreaming.enableControlTwo('seekForward', true);
// ReactNativeAudioStreaming.enableControlTwo('seekBackward', true);
MusicListener.enableControl('nextTrack', false);
MusicListener.enableControl('previousTrack', false);
MusicListener.enableControl('play', true);
MusicListener.enableControl('pause', true);
MusicListener.enableControl('togglePlayPause', true, {});
MusicListener.enableControl('skipForward', true, {interval: 15}); // iOS only
MusicListener.enableControl('skipBackward', true, {interval: 15}); // iOS only




let splashScreenEpisode = {};
let currentDispatch;

MusicListener.on('play', ()=> {
  // _resume(currentDispatch, splashScreenEpisode);
  // MusicControl.MusicControl(splashScreenEpisode);
});

MusicListener.on('togglePlayPause', () => {
});

MusicListener.on('resume', () => {
});

MusicListener.on('pause', ()=> {
  // ReactNativeAudioStreaming.pause();

  // _pause();
  // MusicControl.setNowPlaying(splashScreenEpisode);
});

MusicListener.on('skipForward', () => {
});

MusicListener.on('skipBackward', () => {
});


function _startInterval(dispatch, ep) {
  if(interval == -1337) {
    interval = setInterval(function() {

      currentProgress++;
      let episode = {mediaUrl: ep.mediaUrl, playerStatus: 1, duration: ep.duration, lastPlayed: (new Date()).toDateString(),
        progress: currentProgress, title: ep.title, episodeTitle: ep.episodeTitle, imageUrl: ep.imageUrl, episodeKey: ep.episodeKey};

      dispatch(playerResumeSuccess(episode));
      dispatch(setPodcastHistoryRequest());

      podcastHistoryStorage.setHistory(episode).then((history) => {
        dispatch(setPodcastHistorySuccess(history));
      });

      if (currentProgress + 1 > ep.duration) {


        // dispatch(removePodcastHistoryRequest());

        try {
          // podcastHistoryActions.removePodcastHistory({mediaUrl: ep.mediaUrl});
          _stopInterval();
          var foo = podcastHistoryActions.removePodcastHistory({mediaUrl: ep.mediaUrl});
          foo(dispatch);
          var boo = podcastHistoryActions.getNextPodcastHistory({mediaUrl: ep.mediaUrl});
          boo(dispatch).then((next) => {
            //playerStart(url, title='', episodeTitle='', duration, imageUrl, episodeKey='', progress=0) {
            var bar = playerActions.playerStart(next.mediaUrl, next.title, next.episodeTitle, next.duration, next.imageUrl, next.episodeKey, next.progress);
            bar(dispatch);
          })

        } catch (error) {
          console.log('getNextPodcastHistory PodcastHistory error: ', error);
        }


      }


    }, 1000);
  }
}

function _stopInterval(dispatch) {
  clearInterval(interval);
  interval = -1337;
}


function _setNowPlaying(episode) {

}

function _resume(dispatch, episode) {

  _stopNowPlaying();
  _setNowPlaying(episode);

  _startInterval(dispatch, episode);
  ReactNativeAudioStreaming.resume();
}

function _pause() {
  //pause
  if(true) {
    playbackInstance.pauseAsync();
  } else {
    _stopInterval();
    ReactNativeAudioStreaming.pause();
  }


}

function _stopNowPlaying() {
  // MusicControl.resetNowPlaying()
}

export function playerStart(dispatch, episode, cb) {
  if(true) {
    _stopInterval(dispatch);
    _start(dispatch, episode).then((sound) => {
      playbackInstance = sound;
      playbackInstance.getStatusAsync().then((status) => {
      })
    });
  } else {
    _stopInterval(dispatch);
    // _stopNowPlaying();

    splashScreenEpisode = {
      title: episode.title,
      artwork: episode.imageUrl,
      artist: episode.episodeTitle,
      duration: episode.duration,
      mediaUrl: episode.mediaUrl,
      progress: episode.progress
    };
    //      let episode = {mediaUrl: ep.mediaUrl, playerStatus: 1, duration: ep.duration, lastPlayed: (new Date()).toDateString(),
    // progress: currentProgress, title: ep.title, episodeTitle: ep.episodeTitle, imageUrl: ep.imageUrl, episodeKey: ep.episodeKey};
    currentDispatch = dispatch;

    // Some generic status, I'm sure we can use it somewhere
    ReactNativeAudioStreaming.getStatus((error, status) => {
      if (error) {
        cb(error, episode);
      }
      // episode.progress = status.progress;

      if (status.url == episode.mediaUrl) {
        _resume(dispatch, episode);
        _setNowPlaying(episode)
        cb(null, episode)
      } else {

        ReactNativeAudioStreaming.play(episode.mediaUrl, {
          showIniOSMediaCenter: true,
          showInAndroidNotifications: true,
          title: episode.title,
          artist: episode.episodeTitle,
          elapsedPlaybackTime: episode.progress || 0,
          duration: episode.duration,
          artwork: episode.imageUrl
        });

        _startInterval(dispatch, episode);
        _setNowPlaying(episode);
        if (episode.progress > 0) {
          currentProgress = episode.progress;
          _pause();
          setTimeout(function () {
            // episode.progress = progress;
            ReactNativeAudioStreaming.seekToTime(episode.progress);
            _resume(dispatch, episode)
            // _setNowPlaying(episode);
            cb(null, episode)
          }, 300);
        } else {
          currentProgress = episode.progress;
          cb(null, episode)
        }
      }

    });


  }

}
export function playerResume(dispatch, episode, cb) {
  //let episode = {mediaUrl: url, playerStatus: 1, duration: duration, lastPlayed: (new Date()).toDateString(), title, episodeTitle, imageUrl, episodeKey};
  _resume(dispatch, episode)
  ReactNativeAudioStreaming.getStatus((error, status) => {
    if (error) {
      cb(error, episode);
    } else {
      const {duration, progress} = status;
      episode.progress = progress;
      episode.duration = duration;
      episode.playerStatus = 1;
      currentProgress = progress;
      cb(null, episode);
    }
  });
}
export function playerPause(dispatch, episode, cb) {
  _pause();
  ReactNativeAudioStreaming.getStatus((error, status) => {
    if (error) {
      cb(error, episode);
    } else {
      const {duration, progress} = status;
      episode.progress = progress;
      episode.duration = duration;
      episode.playerStatus = 2;
      currentProgress = progress;
      cb(null, episode);
    }
  });


}
export function playerStop(dispatch, episode, cb) {
  _stopInterval();
  ReactNativeAudioStreaming.stop();
  ReactNativeAudioStreaming.getStatus((error, status) => {
    if (error) {
      cb(error, episode);
    } else {
      const {duration, progress} = status;
      episode.progress = progress;
      episode.duration = duration;
      episode.playerStatus = 4;
      currentProgress = progress;
      cb(null, episode);
    }
  });
}
export function playerGoForward(dispatch, episode, cb) {
  ReactNativeAudioStreaming.goForward(15);
  currentProgress = currentProgress + 15;
  ReactNativeAudioStreaming.getStatus((error, statusObj) => {
    if (error) {
      cb(error, episode);
    } else {
      const {duration, progress, status} = statusObj;
      episode.progress = progress;
      episode.duration = duration;
      episode.playerStatus = (status == "PLAYING") ? 1 : 2;
      currentProgress = progress;
      cb(null, episode);
    }
  });
}

export function playerSeekTo(dispatch, episode, cb) {
  ReactNativeAudioStreaming.seekToTime(episode.progress);
  currentProgress = episode.progress;
  ReactNativeAudioStreaming.getStatus((error, statusObj) => {
    if (error) {
      cb(error, episode);
    } else {
      const {duration, progress, status} = statusObj;
      episode.progress = progress;
      episode.duration = duration;
      episode.playerStatus = (status == "PLAYING") ? 1 : 2;
      currentProgress = progress;
      cb(null, episode);
    }
  });
}

export function playerGoBack(dispatch, episode, cb) {
  currentProgress = (currentProgress > 15) ? currentProgress - 15 : 0;
  ReactNativeAudioStreaming.goBack(15);

  ReactNativeAudioStreaming.getStatus((error, statusObj) => {
    if (error) {
      cb(error, episode);
    } else {
      const {duration, progress, status} = statusObj;
      episode.progress = progress;
      episode.duration = duration;
      episode.playerStatus = (status == "PLAYING") ? 1 : 2;
      currentProgress = progress;
      cb(null, episode);
    }
  });
}

