'use strict';

const {
  GET_PODCAST_SUCCESS,
  GET_PODCAST_FAILURE,

} = require('../../lib/constants').default;

const BackendFactory = require('../../lib/BackendFactory').default;
import _ from 'lodash';
import * as helpers from '../../lib/helpers';
import CONFIG from '../../lib/config'

export function getPodcastSuccess (json) {
  return {
    type: GET_PODCAST_SUCCESS,
    payload: json
  }
}
export function getPodcastFailure (err) {
  return {
    type: GET_PODCAST_FAILURE,
    payload: err
  }
}

export function getPodcast (rss = '') {
  return async (dispatch) =>  {
    try {
      const tokenResult = await BackendFactory().registerThisDevice(CONFIG.deviceUID);
      if(tokenResult.status == 1) {
        const {token} = tokenResult;
        const podcastResult = await BackendFactory(token).getPodcast(rss);
        if (podcastResult.status == 1) {
          let { result } = podcastResult;

          dispatch(getPodcastSuccess(result));

        }
      } else {
        // stuff failed to token initialize
        dispatch(getPodcastFailure());
      }
    } catch(err) {

    }
  }
}

