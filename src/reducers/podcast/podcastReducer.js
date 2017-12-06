const {
  GET_PODCAST_SUCCESS,
  GET_PODCAST_FAILURE,
} = require('../../lib/constants').default;
import Immutable from 'immutable';
import _ from 'lodash';
import podcastInitialState from './podcastInitialState';

const initialState = new Immutable.Map();

const mapEntities = (state, newShowDetail) => {
    return state.set(newShowDetail.id, newShowDetail);
};


export default (state = initialState, action) => {
  switch(action.type) {
    // Handles some UI actions
    case GET_PODCAST_FAILURE:
      // Received pocasts data from an external API
      break;
    case GET_PODCAST_SUCCESS:
      if (!action.payload) { return state }

      return mapEntities(state, action.payload);

  }
  return state;
}
