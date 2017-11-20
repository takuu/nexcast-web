const {
  SEARCH_SHOWS_REQUEST,
  SEARCH_SHOWS_SUCCESS,
  SEARCH_SHOWS_FAILURE,
} = require('../../lib/constants').default;
import Immutable from 'immutable';

import searchInitial from './searchInitialState'

// const initialState = new Immutable.List();
const initialState = new Immutable.Map();


const mergeEntities = (state, searchShows) =>
  state.merge(searchShows.map((podcast) => new searchInitial(podcast)));

export default (state = initialState, action) => {
  var result = {isSearching: true, results: []};
  switch(action.type) {

    // Handles some UI actions
    case SEARCH_SHOWS_REQUEST:
      return Immutable.Map(result);
    case SEARCH_SHOWS_FAILURE:
    // Received pocasts data from an external API
    case SEARCH_SHOWS_SUCCESS:
      if (!action.payload || !action.payload.length) { return state }
      // return mergeEntities(state, Immutable.fromJS(action.payload));
      result.isSearching = false;
      result.results = action.payload;
      return Immutable.Map(result);
  }
  return state;
}
