'use strict'

const {
  GET_TAGGED_SHOWS_REQUEST,
  GET_TAGGED_SHOWS_SUCCESS,
  GET_TAGGED_SHOWS_FAILURE,

} = require('../../lib/constants').default

const BackendFactory = require('../../lib/BackendFactory').default
import {appAuthToken} from '../../lib/AppAuthToken'
import CONFIG from '../../lib/config'

export function getTaggedShowsRequest () {
  return {
    type: GET_TAGGED_SHOWS_REQUEST
  }
}
export function getTaggedShowsSuccess (json) {
  return {
    type: GET_TAGGED_SHOWS_SUCCESS,
    payload: json
  }
}
export function getTaggedShowsFailure (err) {
  return {
    type: GET_TAGGED_SHOWS_FAILURE,
    payload: err
  }
}

export function getTaggedShows () {
  return dispatch => {
    dispatch(getTaggedShowsRequest());

    return BackendFactory().registerThisDevice(CONFIG.deviceUID).then((json) => {
      if(!json && !json.token) dispatch(getTaggedShowsFailure({error: 'err: never got token'}));
      return BackendFactory(json.token).getTaggedShows()
    }).then((data) => {
      let json = (typeof data === 'string') ? JSON.parse(data): data;

      (json.status == 1) ?
        dispatch(getTaggedShowsSuccess(json.result)) :
        dispatch(getTaggedShowsFailure({error: 'err: server status 0'}));

      // GOTO SOME PAGE
      // Actions.somePage()
    })
      .catch((error) => {
        dispatch(getTaggedShowsFailure(error))
      })
  }
}
