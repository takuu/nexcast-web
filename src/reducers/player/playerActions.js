'use strict'
// import { ReactNativeAudioStreaming } from 'react-native-audio-streaming';
let ReactNativeAudioStreaming = {
  pause: () => {},
  stop: () => {},
  start: () => {},
  resume: () => {},
};
import { DeviceEventEmitter } from 'react-native';
import {AsyncStorage} from 'react-native';
import _ from 'lodash';

import * as playerSingleton from './playerSingleton';
import * as audioSingleton from './audioSingleton';

const {
  PLAYER_RESUME_REQUEST,
  PLAYER_PAUSE_REQUEST,
  PLAYER_STOP_REQUEST,
  PLAYER_START_REQUEST,
  PLAYER_SEEKTO_REQUEST,
  PLAYER_GOBACK_REQUEST,
  PLAYER_GOFORWARD_REQUEST,

  PLAYER_RESUME_SUCCESS,
  PLAYER_PAUSE_SUCCESS,
  PLAYER_STOP_SUCCESS,
  PLAYER_START_SUCCESS,
  PLAYER_SEEKTO_SUCCESS,
  PLAYER_GOBACK_SUCCESS,
  PLAYER_GOFORWARD_SUCCESS,

  PLAYER_RESUME_FAILURE,
  PLAYER_PAUSE_FAILURE,
  PLAYER_STOP_FAILURE,
  PLAYER_START_FAILURE,
  PLAYER_SEEKTO_FAILURE,
  PLAYER_GOBACK_FAILURE,
  PLAYER_GOFORWARD_FAILURE,

  PLAYER_MAXIMIZE_SUCCESS,
  PLAYER_MINIMIZE_SUCCESS,

  SET_PODCAST_HISTORY_REQUEST,
  SET_PODCAST_HISTORY_SUCCESS


} = require('../../lib/constants').default;



export function playerResumeRequest (json) { return { type: PLAYER_RESUME_REQUEST, payload: json }}
export function playerResumeSuccess (json) { return { type: PLAYER_RESUME_SUCCESS, payload: json }}
export function playerResumeFailure (json) { return { type: PLAYER_RESUME_FAILURE, payload: json }}

export function playerPauseRequest (json) { return { type: PLAYER_PAUSE_REQUEST, payload: json }}
export function playerPauseSuccess (json) { return { type: PLAYER_PAUSE_SUCCESS, payload: json }}
export function playerPauseFailure (json) { return { type: PLAYER_PAUSE_FAILURE, payload: json }}

export function playerStopRequest (json) { return { type: PLAYER_STOP_REQUEST, payload: json }}
export function playerStopSuccess (json) { return { type: PLAYER_STOP_SUCCESS, payload: json }}
export function playerStopFailure (json) { return { type: PLAYER_STOP_FAILURE, payload: json }}

export function playerStartRequest (json) { return { type: PLAYER_START_REQUEST, payload: json }}
export function playerStartSuccess (json) { return { type: PLAYER_START_SUCCESS, payload: json }}
export function playerStartFailure (json) { return { type: PLAYER_START_FAILURE, payload: json }}

export function playerSeekToRequest (json) { return { type: PLAYER_SEEKTO_REQUEST, payload: json }}
export function playerSeekToSuccess (json) { return { type: PLAYER_SEEKTO_SUCCESS, payload: json }}
export function playerSeekToFailure (json) { return { type: PLAYER_SEEKTO_FAILURE, payload: json }}

export function playerGoBackRequest (json) { return { type: PLAYER_GOBACK_REQUEST, payload: json }}
export function playerGoBackSuccess (json) { return { type: PLAYER_GOBACK_SUCCESS, payload: json }}
export function playerGoBackFailure (json) { return { type: PLAYER_GOBACK_FAILURE, payload: json }}

export function playerGoForwardRequest (json) { return { type: PLAYER_GOFORWARD_REQUEST, payload: json }}
export function playerGoForwardSuccess (json) { return { type: PLAYER_GOFORWARD_SUCCESS, payload: json }}
export function playerGoForwardFailure (json) { return { type: PLAYER_GOFORWARD_FAILURE, payload: json }}

export function setPodcastHistoryRequest (json) { return { type: SET_PODCAST_HISTORY_REQUEST, payload: json }}

export function setPodcastHistorySuccess (json) { return { type: SET_PODCAST_HISTORY_SUCCESS, payload: json }}

export function playerMaximizeSuccess (json) { return { type: PLAYER_MAXIMIZE_SUCCESS, payload: json }}
export function playerMinimizeSuccess (json) { return { type: PLAYER_MINIMIZE_SUCCESS, payload: json }}


// Possibles states
const PLAYING = 'PLAYING';
const STREAMING = 'STREAMING';
const PAUSED = 'PAUSED';
const STOPPED = 'STOPPED';
const ERROR = 'ERROR';
const METADATA_UPDATED = 'METADATA_UPDATED';
const BUFFERING = 'BUFFERING';
const START_PREPARING = 'START_PREPARING'; // Android only
const BUFFERING_START = 'BUFFERING_START'; // Android only

const HISTORY_KEY = 'HISTORY_STORAGE';
let interval = -1337;
let currentProgress = 0;



// //{media, title, episodeTitle, duration, imageUrl}
export function playerStart(url, title='', episodeTitle='', duration, imageUrl, episodeKey='', progress=0) {
  return async dispatch => {

    let episode = {mediaUrl: url, playerStatus: 1, duration: duration, lastPlayed: (new Date()).toDateString(),
      title, episodeTitle, imageUrl, episodeKey, progress};

    AsyncStorage.getItem(HISTORY_KEY, (err, blob) => {
      if(err) console.log("ASYNC_STORAGE FAIL");
      let historyHash = JSON.parse(blob) || {};
      historyHash[episode.mediaUrl] = _.merge(historyHash[episode.mediaUrl], episode);
      AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(historyHash), () => {
        dispatch(setPodcastHistorySuccess(historyHash));
      });
    });

    dispatch(playerStartRequest({mediaUrl: url, playerStatus: 3, title, episodeTitle}));

    audioSingleton.playerStart(dispatch, episode, (error, result) => {
      (error) ? dispatch(playerStartFailure(error)) : dispatch(playerStartSuccess(result));
    });


    // dispatch(playerStartSuccess({mediaUrl: url, playerLoading: true}))
  }
}

export function playerResume(url, title='', episodeTitle='', duration, imageUrl, episodeKey='', progress=0) {
  return dispatch => {

    dispatch(playerResumeRequest({mediaUrl: url, playerStatus: 1}));

    let episode = {mediaUrl: url, playerStatus: 1, lastPlayed: (new Date()).toDateString(),
      title, episodeTitle, imageUrl, episodeKey, duration, progress};

    audioSingleton.playerResume(dispatch, episode, (error, result) => {
      (error) ? dispatch(playerResumeFailure(error)): dispatch(playerResumeSuccess(result));
    });
  }
}

export function minimizePlayer() {
  return dispatch => {
    dispatch(playerMinimizeSuccess({showPlayer: false}));
  }
}

export function maximizePlayer() {
  return dispatch => {
    dispatch(playerMaximizeSuccess({showPlayer: true}));
  }
}

export function playerPause(url) {
  return dispatch => {
    let episode = {mediaUrl: url, playerStatus: 2, lastPlayed: (new Date()).toDateString()};
    dispatch(playerPauseRequest(episode));

    audioSingleton.playerPause(dispatch, episode, (error, result) => {
      (error) ? dispatch(playerPauseFailure(error)): dispatch(playerPauseSuccess(result));
    });
  }
}

export function playerStop(url) {
  return dispatch => {
    let episode = {mediaUrl: url, playerStatus: 4};
    dispatch(playerStopRequest(episode));

    audioSingleton.playerStop(dispatch, episode, (error, result) => {
      (error) ? dispatch(playerStopFailure(error)): dispatch(playerStopSuccess(result));
    });

  }
}

export function playerSeekTo(url, progress) {
  return dispatch => {

    let episode = {mediaUrl: url, playerStatus: 1, progress};
    dispatch(playerSeekToRequest(episode));

    audioSingleton.playerSeekTo(dispatch, episode, (error, result) => {
      (error) ? dispatch(playerSeekToFailure(error)): dispatch(playerSeekToSuccess(result));
    });

  }
}

export function playerGoForward(url, progress) {
  return dispatch => {

    let episode = {mediaUrl: url, progress: progress};
    dispatch(playerGoForwardRequest(episode));

    audioSingleton.playerGoForward(dispatch, episode, (error, result) => {
      (error) ? dispatch(playerGoForwardFailure(error)): dispatch(playerGoForwardSuccess(result));
    });

  }
}

export function playerGoBack(url, progress) {
  return dispatch => {

    let episode = {mediaUrl: url, progress: progress};
    dispatch(playerGoBackRequest(episode));


    audioSingleton.playerGoBack(dispatch, episode, (error, result) => {
      (error) ? dispatch(playerGoBackFailure(error)): dispatch(playerGoBackSuccess(result));
    });
  }
}
