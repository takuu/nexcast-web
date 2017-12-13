'use strict';
import axios from 'axios';
import Action from '../../lib/constants';
import CONFIG from '../../lib/config';

export function getTaggedShows() {
  console.log('getTaggedShows');
  return async (dispatch) => {
    dispatch({ type: Action.GET_TAGGED_SHOWS_REQUEST });
    try {
      const { status, result, error } = (await axios.get(`${CONFIG.baseAPI}/podcasts/hastags`)).data;

      (status == 1) ?
        dispatch({ type: Action.GET_TAGGED_SHOWS_SUCCESS, payload: result }) :
        dispatch({ type: Action.GET_TAGGED_SHOWS_FAILURE, payload: error });
    } catch (err) {
      dispatch({ type: Action.GET_TAGGED_SHOWS_FAILURE, payload: err });
      console.log('getTaggedShows err', err);
    }
  };
}
