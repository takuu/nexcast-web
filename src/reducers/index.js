'use strict';

import { combineReducers } from 'redux';

// import auth from './auth/authReducer'
import device from './device/deviceReducer'
import global from './global/globalReducer'
import popular from './discover/discoverReducer';
import podcastInfo from './podcast/podcastReducer';
// import profile from './profile/profileReducer'
import taggedShows from './taggedShow/taggedShowReducer'
import showDetail from './showDetail/showDetailReducer'
import player from './player/playerReducer'
import podcastHistory from './podcastHistory/podcastHistoryReducer'
import subscription from './subscription/subscriptionReducer'
import tags from './tag/tagReducer'
import searchShows from './search/searchReducer'

const rootReducer = combineReducers({
  // auth,
  device,
  global,
  // profile,
  popular,
  podcastInfo,
  taggedShows,
  showDetail,
  player,
  podcastHistory,
  subscription,
  tags,
  searchShows
});

export default rootReducer
