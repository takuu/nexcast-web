const {
  GET_EPISODES_REQUEST,
  GET_EPISODES_SUCCESS,
  GET_EPISODES_FAILURE,
} = require('../../lib/constants').default;
import Immutable from 'immutable';
import _ from 'lodash';
import showDetailInitial from './showDetailInitialState';

const initialState = new Immutable.Map();

const mapEntities = (state, newShowDetail) => {
  if(newShowDetail.length) {
    return state.set(newShowDetail[0].rss, newShowDetail);
  } else {
    return state;
  }
};


export default (state = initialState, action) => {
  switch(action.type) {
    // Handles some UI actions
    case GET_EPISODES_REQUEST:
    case GET_EPISODES_FAILURE:
    // Received pocasts data from an external API
          break;
    case GET_EPISODES_SUCCESS:
      if (!action.payload) { return state }

      return mapEntities(state, action.payload);

  }
  return state;
}
