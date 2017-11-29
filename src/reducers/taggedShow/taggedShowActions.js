'use strict';
import axios from 'axios';
import Action from '../../lib/constants';
// const baseUrl = 'http://localhost:1337';
import { baseUrl } from '../../config.json';

export function getTaggedShows() {
  console.log('getTaggedShows');
  return async (dispatch) => {
    dispatch({ type: Action.GET_TAGGED_SHOWS_REQUEST });
    try {
      const { status, result, error } = (await axios.get(`${baseUrl}/v1/api/podcasts/hastags`)).data;

      (status == 1) ?
        dispatch({ type: Action.GET_TAGGED_SHOWS_SUCCESS, payload: result }) :
        dispatch({ type: Action.GET_TAGGED_SHOWS_FAILURE, payload: error });
    } catch (err) {
      dispatch({ type: Action.GET_TAGGED_SHOWS_FAILURE, payload: err });
      console.log('getTaggedShows err', err);
    }
  };
}
