'use strict'

const {
  SEARCH_SHOWS_REQUEST,
  SEARCH_SHOWS_SUCCESS,
  SEARCH_SHOWS_FAILURE,

} = require('../../lib/constants').default

const BackendFactory = require('../../lib/BackendFactory').default
import {appAuthToken} from '../../lib/AppAuthToken'
import CONFIG from '../../lib/config'

export function searchShowsRequest () {
  return {
    type: SEARCH_SHOWS_REQUEST
  }
}
export function searchShowsSuccess (json) {
  return {
    type: SEARCH_SHOWS_SUCCESS,
    payload: json
  }
}
export function searchShowsFailure (err) {
  return {
    type: SEARCH_SHOWS_FAILURE,
    payload: err
  }
}

export function searchShows (name) {
  return dispatch => {
    dispatch(searchShowsRequest())

    return BackendFactory().registerThisDevice(CONFIG.deviceUID).then((json) => {
      if(!json && !json.token) dispatch(searchShowsFailure({error: 'err: never got token'}));
      return BackendFactory(json.token).searchShows(name)
    }).then((data) => {
      let json = (typeof data === 'string') ? JSON.parse(data): data;

      (json.status == 1) ?
        dispatch(searchShowsSuccess(json.result)) :
        dispatch(searchShowsFailure({error: 'err: server status 0'}));

      // GOTO SOME PAGE
      // Actions.somePage()
    })
      .catch((error) => {
        dispatch(searchShowsFailure(error))
      })
  }
}
