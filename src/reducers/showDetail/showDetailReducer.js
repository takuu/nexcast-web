import ActionTypes from '../../lib/constants';
import Immutable from 'immutable';
import _ from 'lodash';
import showDetailInitial from './showDetailInitialState';

const initialState = new Immutable.Map();

const mapEntities = (state, newShowDetail) => {
  if(newShowDetail.length) {
    return state.set(newShowDetail[0].podcast_id, newShowDetail);
  } else {
    return state;
  }
};


export default (state = initialState, action) => {
  switch(action.type) {
    // Handles some UI actions
    case ActionTypes.GET_EPISODES_REQUEST:
    case ActionTypes.GET_EPISODES_FAILURE:
    // Received pocasts data from an external API
          break;
    case ActionTypes.GET_EPISODES_SUCCESS:
      if (!action.payload) { return state }

      return mapEntities(state, action.payload);

    case ActionTypes.GET_EPISODE_SUCCESS:
      let episodeList = state.get(action.payload.podcast_id);
      if(episodeList) {
        const found = _.find(episodeList, {episode_key: action.payload.episode_key});
        if(!found) episodeList.push(action.payload);
        return state.set(action.payload.podcast_id, episodeList);
      } else {
        return state.set(action.payload.podcast_id, [action.payload]);
      }

  }
  return state;
}
