'use strict';

import Expo, { Asset, Audio, Font, Video } from 'expo';
import MusicListener from '../../lib/MusicListener';
import _ from 'lodash';
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

export function removePodcastHistorySuccess (json) { return { type: SET_PODCAST_HISTORY_SUCCESS, payload: json }}
export function playerStartSuccess (json) { return { type: PLAYER_START_SUCCESS, payload: json }}

export function playerResumeRequest (json) { return { type: PLAYER_RESUME_REQUEST, payload: json }}
export function playerResumeSuccess (json) { return { type: PLAYER_RESUME_SUCCESS, payload: json }}
export function playerResumeFailure (json) { return { type: PLAYER_RESUME_FAILURE, payload: json }}

export function setPodcastHistoryRequest (json) { return { type: SET_PODCAST_HISTORY_REQUEST, payload: json }}
export function setPodcastHistorySuccess (json) { return { type: SET_PODCAST_HISTORY_SUCCESS, payload: json }}

export function playerNextPodcastSuccess (json) { return { type: GET_NEXT_PODCAST_HISTORY_SUCCESS, payload: json }}

let splashScreenEpisode = {};
let currentDispatch;
let playerStatus;
let currentEpisode = {};

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
    };
    const {sound , status} = await Audio.Sound.create(
      { uri: ep.mediaUrl || '' },
      { shouldPlay: true },
    );
    sound.setCallback(_callback);
    playerStatus = 1;

    instance = sound;
  } catch(err) {
    console.log(err);
  }

  function _callback(status) {
    let progress = parseInt(status.positionMillis/1000);
    let duration = parseInt(status.durationMillis/1000);
    let episode = {mediaUrl: status.uri, playerStatus: playerStatus, duration: duration, lastPlayed: (new Date()).toDateString(),
      progress: progress, title: ep.episodeTitle, episodeTitle: ep.episodeTitle, imageUrl: ep.imageUrl, episodeKey: ep.episodeKey};

    dispatch(playerResumeSuccess(episode));
    dispatch(setPodcastHistoryRequest());

    podcastHistoryStorage.setHistory(episode).then((history) => {
      dispatch(setPodcastHistorySuccess(history));
    });

    if (progress + 1 > duration) {

      try {
        // This is to get the next episodes in queue

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

async function setStatus(config ={}) {
  let playbackStatus;
  try {
    playbackStatus = await playbackInstance.setStatusAsync(config);
  } catch (err) {
    console.log('playbackStatus setStatus: ', err);
  }

  return playbackStatus;

}

function _resume(dispatch, episode) {
  // ReactNativeAudioStreaming.resume();
  playerStatus = 1;
  playbackInstance.playAsync();

}

function _pause() {
  playerStatus = 2;
  playbackInstance.pauseAsync();

}

function _stopNowPlaying() {
  // MusicControl.resetNowPlaying()
}

export function playerStart(dispatch, episode, cb) {
  
  
  console.log('playerStart: ', episode);
  if(currentEpisode.mediaUrl != episode.mediaUrl) {
    currentEpisode = _.cloneDeep(episode);
    _start(dispatch, episode).then((sound) => {
      playbackInstance = sound;
      playbackInstance.getStatusAsync().then((status) => {
      })
    });
  }



}
export function playerResume(dispatch, episode, cb) {
  //let episode = {mediaUrl: url, playerStatus: 1, duration: duration, lastPlayed: (new Date()).toDateString(), title, episodeTitle, imageUrl, episodeKey};
  _resume(dispatch, episode)
}
export function playerPause(dispatch, episode, cb) {
  _pause();
}
export function playerStop(dispatch, episode, cb) {
  playbackInstance.stopAsync();
}
export function playerGoForward(dispatch, episode, cb) {
  // playbackInstance.playFromPositionAsync(episode.progress-15);
  setStatus({shouldPlay: true, positionMillis: (episode.progress+15) * 1000}).then((status) => {
  });
}

export function playerSeekTo(dispatch, episode, cb) {
  // playbackInstance.playFromPositionAsync(episode.progress);
  setStatus({shouldPlay: true, positionMillis: episode.progress * 1000}).then((status) => {
  });
}
export function playerGoBack(dispatch, episode, cb) {
  // playbackInstance.playFromPositionAsync(episode.progress-15);
  setStatus({shouldPlay: true, positionMillis: (episode.progress-15) * 1000}).then((status) => {
  });
}

