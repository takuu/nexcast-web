'use strict';

import { combineReducers } from 'redux';

import auth from './auth/authReducer'
import device from './device/deviceReducer'
import global from './global/globalReducer'
import podcasts from './discover/discoverReducer';
import podcastInfo from './podcast/podcastReducer';
import profile from './profile/profileReducer'
import taggedShows from './taggedShow/taggedShowReducer'
import showDetail from './showDetail/showDetailReducer'
import player from './player/playerReducer'
import podcastHistory from './podcastHistory/podcastHistoryReducer'
import subscription from './subscription/subscriptionReducer'
import tags from './tag/tagReducer'
import searchShows from './search/searchReducer'



// Navigation
// import { TabBar, tabBarReducer } from '../navigation/TabBarConfiguration'
// import { QueueNavigation, UserPodcastsNavigation, SearchNavigation, DiscoverNavigation } from '../navigation/NavigatorConfiguration';
import { navReducer } from '../navigation';

/**
 * ## CombineReducers
 *
 * the rootReducer will call each and every reducer with the state and action
 * EVERY TIME there is a basic action
 */
const rootReducer = combineReducers({
  navReducer,
/*
  tabBar: tabBarReducer,

  tabOne: (state,action) => QueueNavigation.router.getStateForAction(action,state),

  tabTwo: (state,action) => UserPodcastsNavigation.router.getStateForAction(action,state),

  tabThree: (state,action) => SearchNavigation.router.getStateForAction(action,state),

  tabFour: (state,action) => DiscoverNavigation.router.getStateForAction(action,state),
*/
  auth,
  device,
  global,
  profile,
  podcasts,
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
