const {
  GET_TAGGED_SHOWS_REQUEST,
  GET_TAGGED_SHOWS_SUCCESS,
  GET_TAGGED_SHOWS_FAILURE,

} = require('../../lib/constants').default
import Immutable from 'immutable';

import taggedShowInitial from './taggedShowInitialState'

const TaggedShowList = Immutable.List;

// const initialState = new TaggedShowMap();
const initialState = new TaggedShowList();


const mergeEntities = (state, newTaggedShows) =>
  state.merge(newTaggedShows.map((podcast) => new taggedShowInitial(podcast)));

export default (state = initialState, action) => {
  switch(action.type) {

    // Handles some UI actions
    case GET_TAGGED_SHOWS_REQUEST:
    case GET_TAGGED_SHOWS_FAILURE:
    // Received pocasts data from an external API
    case GET_TAGGED_SHOWS_SUCCESS:

      if (!action.payload || !action.payload.length) { return state }
      console.log(`%cGET_TAGGED_SHOWS_SUCCESS: ${action.payload.length}`);
      console.log(action.payload[0]);
      return mergeEntities(state, Immutable.fromJS(action.payload));
  }
  return state;
}
