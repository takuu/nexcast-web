'use strict';

import ActionTypes from '../../lib/constants';

const BackendFactory = require('../../lib/BackendFactory').default;
import _ from 'lodash';
import * as helpers from '../../lib/helpers';
import CONFIG from '../../lib/config';
import { baseUrl } from '../../config.json';
import Action from '../../lib/constants';
import axios from 'axios';

export function getEpisodesOld (rss = '') {

  return async (dispatch) => {
    try {
      const tokenResult = await BackendFactory().registerThisDevice(CONFIG.deviceUID);

      if(tokenResult.status == 1) {
        const {token} = tokenResult;
        const episodesResult = await BackendFactory(token).getEpisodes(rss);
        if (episodesResult.status == 1) {
          let {result} = episodesResult;
          const episodes = _.map(result, (episode) => {
            episode.title = episode.title.replace('↵', '');
            episode.rss = rss;
            return episode
          });
          dispatch({ type: ActionTypes.GET_EPISODES_SUCCESS, payload: episodes });
        } else {
          dispatch({ type: ActionTypes.GET_EPISODES_FAILURE, payload: 'err: fetching episodes failed' });
        }
      } else {
        // Failed to get token
      }
    } catch (error) {
      console.log('general error2: ', error);
    }
  };
}

export function getEpisodes (rss = '', limit=10) {
  return async (dispatch) => {
    try {
      const { status, result, error } = (await axios.get(`${CONFIG.baseAPI}/episodes/episodeByRSS?rss=${rss}&limit=${limit}`)).data;

      (status == 1) ?
        dispatch({
          type: Action.GET_EPISODES_SUCCESS,
          payload: result.map(episode => ({ ...episode, title: episode.title.replace('↵', ''), rss: decodeURIComponent(rss) })),
        }) :
        dispatch({ type: Action.GET_EPISODES_FAILURE, payload: error });

    } catch (err) {
      dispatch({ type: Action.GET_EPISODES_FAILURE, payload: err });
    }
  }
}



export function getEpisodeByKey (key = '') {
  return async (dispatch) => {
    try {
      const { status, result = {}, error } = (await axios.get(`${CONFIG.baseAPI}/episodes/episodeKey/${key}`)).data;
      const episode = {
        ...result,
        title: result.title.replace('↵', '')
      };

      (status == 1) ?
        dispatch({
          type: Action.GET_EPISODE_SUCCESS,
          payload: episode,
        }) :
        dispatch({ type: Action.GET_EPISODE_FAILURE, payload: error });
    } catch (err) {
      dispatch({ type: Action.GET_EPISODE_FAILURE, payload: err });
    }
  }


}
export function getEpisodesById (id = '', limit=10) {
  return async (dispatch) => {
    try {
      const { status, result, error } = (await axios.get(`${CONFIG.baseAPI}/episodes/podcast/${id}?&limit=${limit}`)).data;

      (status == 1) ?
        dispatch({
          type: Action.GET_EPISODES_SUCCESS,
          payload: result.map(episode => ({ ...episode, title: episode.title.replace('↵', '') })),
        }) :
        dispatch({ type: Action.GET_EPISODES_FAILURE, payload: error });

    } catch (err) {
      dispatch({ type: Action.GET_EPISODES_FAILURE, payload: err });
    }
  }
}