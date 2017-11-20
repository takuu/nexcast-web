'use strict';

const {
  GET_POPULAR_REQUEST,
  GET_POPULAR_SUCCESS,
  GET_POPULAR_FAILURE,

  GET_CATEGORY_REQUEST,
  GET_CATEGORY_SUCCESS,
  GET_CATEGORY_FAILURE,

  PROFILE_UPDATE_REQUEST,
  PROFILE_UPDATE_SUCCESS,
  PROFILE_UPDATE_FAILURE,

  ON_PROFILE_FORM_FIELD_CHANGE
} = require('../../lib/constants').default
import CONFIG from '../../lib/config'

const BackendFactory = require('../../lib/BackendFactory').default
import {appAuthToken} from '../../lib/AppAuthToken'
import _ from 'lodash';


export function getPopularRequest () {
  return {
    type: GET_POPULAR_REQUEST
  }
}
export function getPopularSuccess (json) {
  return {
    type: GET_POPULAR_SUCCESS,
    payload: json
  }
}
export function getPopularFailure (err) {
  return {
    type: GET_POPULAR_FAILURE,
    payload: err
  }
}

export function getCategoryRequest () {
  return {
    type: GET_CATEGORY_REQUEST
  }
}
export function getCategorySuccess (json) {
  return {
    type: GET_CATEGORY_SUCCESS,
    payload: json
  }
}
export function getCategoryFailure (err) {
  return {
    type: GET_CATEGORY_FAILURE,
    payload: err
  }
}

export function getPopular () {
  return dispatch => {
    dispatch(getPopularRequest())

    return BackendFactory().registerThisDevice(CONFIG.deviceUID).then((json) => {
      if(!json && !json.token) dispatch(getPopularFailure({error: 'err: never got token'}));
        return BackendFactory(json.token).getPopular()
      }).then((data) => {

        let json = (typeof data === 'string') ? JSON.parse(data): data;
        let result = _.map(json.result, (item) => {
          return {

            artist_name: item.podcast.artist_name,
            description: item.podcast.description,
            feed_url: item.podcast.feed_url,
            id: item.podcast.id,
            image_url: item.podcast.image_url,
            title: item.podcast.title,
            release_date: item.podcast.release_date,
            created_at: item.created_at,
            genre_id: item.genre_id,
            rank_date: item.rank_date,
            rank_number: item.rank_number,

          };
        });

        (json.status == 1) ?
          dispatch(getPopularSuccess(result)) :
          dispatch(getPopularFailure({error: 'err: server status 0'}));

        // GOTO SOME PAGE
        // Actions.somePage()
      })
      .catch((error) => {
        dispatch(getPopularFailure(error))
      })
  }
}


export function getCategoryOld (id) {
  return dispatch => {
    dispatch(getCategoryRequest(id))
    return BackendFactory().getCategory(id)
      .then((json) => {
        dispatch(getCategorySuccess(json))

        // GOTO SOME PAGE
        // Actions.somePage()
      })
      .catch((error) => {
        dispatch(getCategoryFailure(error))
      })
  }
}
export function getCategory (id) {
  return dispatch => {
    dispatch(getCategoryRequest())

    return BackendFactory().registerThisDevice(CONFIG.deviceUID).then((json) => {
      if(!json && !json.token) dispatch(getCategoryFailure({error: 'err: never got token'}));
      return BackendFactory(json.token).getCategory(id)
    }).then((data) => {
      let json = (typeof data === 'string') ? JSON.parse(data): data;
      let result = _.map(json.result, (item) => {
        return {
          artist_name: item.podcast.artist_name,
          description: item.podcast.description,
          feed_url: item.podcast.feed_url,
          id: item.podcast.id,
          image_url: item.podcast.image_url,
          title: item.podcast.title,
          release_date: item.podcast.release_date,
          created_at: item.created_at,
          genre_id: item.genre_id,
          rank_date: item.rank_date,
          rank_number: item.rank_number,
        };
      });
      (json.status == 1) ?
        dispatch(getCategorySuccess(result)) :
        dispatch(getCategoryFailure({error: 'err: server status 0'}));

      // GOTO SOME PAGE
      // Actions.somePage()
    })
      .catch((error) => {
        dispatch(getCategoryFailure(error))
      })
  }
}

export function profileUpdateRequest () {
  return {
    type: PROFILE_UPDATE_REQUEST
  }
}
export function profileUpdateSuccess () {
  return {
    type: PROFILE_UPDATE_SUCCESS
  }
}
export function profileUpdateFailure (json) {
  return {
    type: PROFILE_UPDATE_FAILURE,
    payload: json
  }
}

export function updateProfile (userId, username, email, sessionToken) {
  return dispatch => {
    dispatch(profileUpdateRequest())
    return appAuthToken.getSessionToken(sessionToken)
      .then((token) => {
        return BackendFactory(token).updateProfile(userId,
          {
            username: username,
            email: email
          }
        )
      })
      .then(() => {
        dispatch(profileUpdateSuccess())
        dispatch(getProfile())
      })
      .catch((error) => {
        dispatch(profileUpdateFailure(error))
      })
  }
}

export function onProfileFormFieldChange (field, value) {
  return {
    type: ON_PROFILE_FORM_FIELD_CHANGE,
    payload: {field: field, value: value}
  }
}

