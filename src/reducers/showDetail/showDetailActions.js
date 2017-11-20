'use strict';

import ActionTypes from '../../lib/constants';

const BackendFactory = require('../../lib/BackendFactory').default;
import _ from 'lodash';
import * as helpers from '../../lib/helpers';
import CONFIG from '../../lib/config'


export function getEpisodes (rss = '') {

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
