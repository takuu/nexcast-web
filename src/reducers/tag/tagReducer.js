const {
  HAS_TAG_REQUEST,
  HAS_TAG_SUCCESS,
  HAS_TAG_FAILURE,
  GET_TAGS_REQUEST,
  GET_TAGS_SUCCESS,
  GET_TAGS_FAILURE
} = require('../../lib/constants').default;
import Immutable from 'immutable';
import _ from 'lodash';
const initialState = new Immutable.Map();

const mapEntities = (state, newTags) => {
  const key = (newTags.length) ? newTags[0].episode_key : 'none';
  return state.set(key, newTags);
};

export default (state = initialState, action) => {
  switch(action.type) {

    // Handles some UI actions
    case HAS_TAG_REQUEST:
    case HAS_TAG_FAILURE:
    // Received pocasts data from an external API
    case HAS_TAG_SUCCESS:
      if (!action.payload || !action.payload.length) { return state }
      //episode_key
      // let hash = _.keyBy(action.payload, 'episode_key');
      let hash = {};
      _.map(action.payload, (tag) => {
        const key = tag.episode_key;
        hash[key] = hash[key] || [];
        hash[key].push(tag);
      });

      _.map(Object.keys(hash), (tagKey) => {
        state = state.set(tagKey, hash[tagKey])
      });

      return state;

    case GET_TAGS_REQUEST:
    case GET_TAGS_FAILURE:
    case GET_TAGS_SUCCESS:
      if (!action.payload || !action.payload.length) { return state }
      return mapEntities(state, action.payload);

  }
  return state;
}
