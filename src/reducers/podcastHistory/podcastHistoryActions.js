const {
  SET_PODCAST_HISTORY_REQUEST,
  SET_PODCAST_HISTORY_SUCCESS,
  SET_PODCAST_HISTORY_FAILURE,

  REMOVE_PODCAST_HISTORY_REQUEST,
  REMOVE_PODCAST_HISTORY_SUCCESS,
  REMOVE_PODCAST_HISTORY_FAILURE,

  GET_NEXT_PODCAST_HISTORY_REQUEST,
  GET_NEXT_PODCAST_HISTORY_SUCCESS,
  GET_NEXT_PODCAST_HISTORY_FAILURE,

  GET_ALL_PODCAST_HISTORY_SUCCESS,

  PLAYER_START_REQUEST,
  PLAYER_START_SUCCESS,
  PLAYER_START_FAILURE,
} = require('../../lib/constants').default;

import ActionTypes from '../../lib/constants';
const BackendFactory = require('../../lib/BackendFactory').default;

import * as podcastHistoryStorage from './podcastHistoryStorage';

import Immutable from 'immutable';
import {AsyncStorage} from 'react-native';
import _ from 'lodash';
import moment from 'moment';
import CONFIG from '../../lib/config'

export function playerStartRequest (json) { return { type: PLAYER_START_REQUEST, payload: json }}
export function playerStartSuccess (json) { return { type: PLAYER_START_SUCCESS, payload: json }}
export function playerStartFailure (json) { return { type: PLAYER_START_FAILURE, payload: json }}

export function getNextPodcastHistoryRequest () {

}

export function getNextPodcastHistorySuccess (json) {
  return {
    type: GET_NEXT_PODCAST_HISTORY_SUCCESS,
    payload: json
  }
}

export function getNextPodcastHistoryFailure () {

}

export function setPodcastHistoryRequest () {
  return {
    type: SET_PODCAST_HISTORY_REQUEST
  }
}
export function setPodcastHistorySuccess (json) {
  return {
    type: SET_PODCAST_HISTORY_SUCCESS,
    payload: json
  }
}
export function setPodcastHistoryFailure (err) {
  return {
    type: SET_PODCAST_HISTORY_FAILURE,
    payload: err
  }
}

export function removePodcastHistoryRequest () {
  return {
    type: SET_PODCAST_HISTORY_REQUEST
  }
}
export function removePodcastHistorySuccess (json) {
  return {
    type: SET_PODCAST_HISTORY_SUCCESS,
    payload: json
  }
}
export function removePodcastHistoryFailure (err) {
  return {
    type: SET_PODCAST_HISTORY_FAILURE,
    payload: err
  }
}

export function getAllPodcastHistorySuccess (json) {
  return {
    type: GET_ALL_PODCAST_HISTORY_SUCCESS,
    payload: json
  }
}

const HISTORY_KEY = 'HISTORY_STORAGE';
const SUBSCRIPTION_KEY = 'SUBSCRIPTION_STORAGE';


export function getAllPodcastHistory () {

  // AsyncStorage.removeItem(HISTORY_KEY, (err) => {});
  return async dispatch => {
    try {
      const history = await podcastHistoryStorage.getAllHistory();
      dispatch(getAllPodcastHistorySuccess(history));
    } catch (error) {
      console.log('podcastHistoryActions.getAllPodcastHistory error: ', error);
    }

  }
}

export function getNextPodcastHistory (currentEpisode) {

  // AsyncStorage.removeItem(HISTORY_KEY, (err) => {});
  return async dispatch => {
    let next;
    try {
      next = await podcastHistoryStorage.getNextHistory(currentEpisode);
      dispatch(playerStartSuccess(next));
    } catch (error) {
      console.log('getNextPodcastHistory PodcastHistory error: ', error);
    }
    return next;
  }
}


export function removePodcastHistory (episode={}) {
  return async dispatch => {

    dispatch(removePodcastHistoryRequest());

    try {
      let newHistory = await podcastHistoryStorage.removeHistory(episode);
      dispatch(removePodcastHistorySuccess(newHistory));
    } catch (error) {
      console.log('getNextPodcastHistory PodcastHistory error: ', error);
    }
  }
}

export function getEpisodesBySubscription() {
  return async (dispatch) => {
    try {


      const subscriptionsBlob = await AsyncStorage.getItem(SUBSCRIPTION_KEY);
      let subscriptions = JSON.parse(subscriptionsBlob) || {};
      dispatch({ type: ActionTypes.GET_ALL_SUBSCRIPTION_SUCCESS, payload: subscriptions });
      const tokenResult = await BackendFactory().registerThisDevice(CONFIG.deviceUID);

      console.log('getEpisodesBySubscription: 1', tokenResult, subscriptions);
      if(tokenResult.status == 1) {
        const {token} = tokenResult;
        let episodeList = [];
        for(let i=0; i<Object.keys(subscriptions).length; i++) {
          const key = Object.keys(subscriptions)[i];
          const podcast = subscriptions[key];
          const episodesResult = await BackendFactory(token).getEpisodes(podcast.feed_url, 5);

          if (episodesResult.status == 1) {
            let {result} = episodesResult;
            console.log('episodesResult: ', episodesResult);
            let episodes = _.orderBy(_.map(result, (episode) => {
              episode.title = episode.title.replace('↵', '');
              episode.rss = podcast.feed_url;
              return {
                title: episode.title.replace('↵', ''),
                rss: podcast.feed_url,
                duration: episode.duration,
                episodeKey: episode.episode_key,
                publishDate: episode.pub_date,
                episodeTitle: episode.title.replace('↵', ''),
                imageUrl: episode.image_location,
                lastPlayed: Date.now(),
                mediaUrl: episode.media_location,
                playerStatus: 0,
                progress: 0
              };
            }), 'pub_date');
            episodeList = episodeList.concat(episodes);
            console.log('getEpisodesBySubscription 2 podcast: ', episodes, episodeList);

          } else {
            dispatch({ type: ActionTypes.GET_EPISODES_FAILURE, payload: 'err: fetching episodes failed' });
          }

        }
        console.log('getEpisodesBySubscription 3 podcast: ', episodeList);
        dispatch({ type: ActionTypes.GET_ALL_SUBSCRIPTION_EPISODES_SUCCESS, payload: episodeList});





      } else {
        // Failed to get token
      }

    } catch (error) {
      console.log('general error: ', error);
    }
  }
}




// This is unused.......
export function setPodcastHistoryDeprecated (episode={}) {
  return async dispatch => {
    try {
      let historyHash = await AsyncStorage.getItem(HISTORY_KEY) || {};
      historyHash = JSON.parse(historyHash);
      historyHash[episode.mediaUrl] = _.merge(historyHash[episode.mediaUrl], episode);
      await AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(historyHash));
      dispatch(setPodcastHistorySuccess(historyHash));
    } catch (error) {

    }

  }
}
