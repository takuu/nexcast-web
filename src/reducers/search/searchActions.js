'use strict';

import axios from 'axios';
import CONFIG from '../../lib/config';

import Action from '../../lib/constants';


export function searchPodcastShows (key) {
  return async dispatch => {
    dispatch({ type: Action.SEARCH_SHOWS_REQUEST });
    try {
      const { status, result, error } = (await axios.get(`${CONFIG.baseAPI}/podcasts/search?term=${key}`)).data;
      (status == 1) ?
        dispatch({ type: Action.SEARCH_SHOWS_SUCCESS, payload: result }) :
        dispatch({ type: Action.SEARCH_SHOWS_FAILURE, payload: error });
    } catch(err) {
      dispatch({ type: Action.SEARCH_SHOWS_FAILURE, payload: err });
    }
  }
}

