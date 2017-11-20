const {
  GET_POPULAR_REQUEST,
  GET_POPULAR_SUCCESS,
  GET_POPULAR_FAILURE,

  GET_TAGGED_SHOWS_REQUEST,
  GET_TAGGED_SHOWS_SUCCESS,
  GET_TAGGED_SHOWS_FAILURE,

  GET_CATEGORIES_REQUEST,
  GET_CATEGORIES_SUCCESS,
  GET_CATEGORIES_FAILURE,

  GET_CATEGORY_REQUEST,
  GET_CATEGORY_SUCCESS,
  GET_CATEGORY_FAILURE,

  GET_EPISODES_REQUEST,
  GET_EPISODES_SUCCESS,
  GET_EPISODES_FAILURE,

} = require('../../lib/constants').default
import Immutable from 'immutable';

import PodcastInitial from './podcastInitialState'

// const Podcast = new PodcastInitial();

const PodcastMap = Immutable.OrderedMap;
const PodcastList = Immutable.List;

// const initialState = new PodcastMap();
const initialState = new PodcastList();


const mergeEntities = (state, newPodcasts) =>
  state.merge(newPodcasts.map((podcast) => new PodcastInitial(podcast)));



export default (state = initialState, action) => {
  switch(action.type) {
    // Handles some UI actions
    case GET_POPULAR_REQUEST:
    case GET_POPULAR_FAILURE:
    // Received pocasts data from an external API
    case GET_POPULAR_SUCCESS:
      if (!action.payload || !action.payload.length) { return state }
      return mergeEntities(state, Immutable.fromJS(action.payload));
    case GET_CATEGORY_SUCCESS:
      if (!action.payload || !action.payload.length) { return state }

      return mergeEntities(state, Immutable.fromJS(action.payload));
      break;
  }
  return state;
}
