'use strict'
import {AsyncStorage} from 'react-native';
import _ from 'lodash';

const {
  SET_SUBSCRIPTION_REQUEST,
  SET_SUBSCRIPTION_SUCCESS,
  SET_SUBSCRIPTION_FAILURE,

  REMOVE_SUBSCRIPTION_REQUEST,
  REMOVE_SUBSCRIPTION_SUCCESS,

  GET_ALL_SUBSCRIPTION_SUCCESS,

} = require('../../lib/constants').default


export function setSubscriptionRequest(json) {
  return {
    type: SET_SUBSCRIPTION_REQUEST,
    payload: json
  }
}

export function setSubscriptionSuccess(json) {
  return {
    type: SET_SUBSCRIPTION_SUCCESS,
    payload: json
  }
}

export function removeSubscriptionRequest(json) {
  return {
    type: REMOVE_SUBSCRIPTION_REQUEST,
    payload: json
  }
}

export function removeSubscriptionSuccess(json) {
  return {
    type: REMOVE_SUBSCRIPTION_SUCCESS,
    payload: json
  }
}

export function getAllSubscriptionSuccess(json) {
  return {
    type: GET_ALL_SUBSCRIPTION_SUCCESS,
    payload: json
  }
}


const SUBSCRIPTION_KEY = 'SUBSCRIPTION_STORAGE';

export function getAllSubscription () {
  // AsyncStorage.removeItem(SUBSCRIPTION_KEY, (err) => {});
  return dispatch => {
    AsyncStorage.getItem(SUBSCRIPTION_KEY, (err, blob) => {
      if(err) console.log("ASYNC_STORAGE FAIL");
      let historyHash = JSON.parse(blob) || {};
      dispatch(getAllSubscriptionSuccess(historyHash));
    });
  }
}


export function removeSubscription (show={}) {
  return dispatch => {

    dispatch(removeSubscriptionRequest());
    AsyncStorage.getItem(SUBSCRIPTION_KEY, (err, blob) => {
      if(err) console.log("ASYNC_STORAGE FAIL");
      let subscriptionHash = JSON.parse(blob) || {};
      if (subscriptionHash && subscriptionHash[show.feed_url]) delete subscriptionHash[show.feed_url];
      // _.remove(subscriptionHash, {rss: show.rss});
      AsyncStorage.setItem(SUBSCRIPTION_KEY, JSON.stringify(subscriptionHash), () => {
        dispatch(removeSubscriptionSuccess(subscriptionHash));
      })
    });

  }
}

export function setSubscription (show={}) {
  return dispatch => {

    dispatch(setSubscriptionRequest());
    AsyncStorage.getItem(SUBSCRIPTION_KEY, (err, blob) => {
      if(err) console.log("ASYNC_STORAGE FAIL");
      let subscriptionHash = JSON.parse(blob) || {};
      subscriptionHash[show.feed_url] = _.merge(subscriptionHash[show.feed_url], show);
      AsyncStorage.setItem(SUBSCRIPTION_KEY, JSON.stringify(subscriptionHash), () => {
        dispatch(setSubscriptionSuccess(subscriptionHash));
      })
    });

  }
}

