'use strict'

const {
  GET_CATEGORIES_REQUEST,
  GET_CATEGORIES_SUCCESS,
  GET_CATEGORIES_FAILURE,


} = require('../../lib/constants').default

const BackendFactory = require('../../lib/BackendFactory').default
import {appAuthToken} from '../../lib/AppAuthToken'
import CONFIG from '../../lib/config'

export function getCategoriesRequest () {
  return {
    type: GET_CATEGORIES_REQUEST
  }
}
export function getCategoriesSuccess (json) {
  return {
    type: GET_CATEGORIES_SUCCESS,
    payload: json
  }
}
export function getCategoriesFailure (err) {
  return {
    type: GET_CATEGORIES_FAILURE,
    payload: err
  }
}


export function getCategoriesOld () {
  return dispatch => {
    dispatch(getCategoriesRequest())
    return BackendFactory().getCategories()
      .then((json) => {
        dispatch(getCategoriesSuccess(json))

        // GOTO SOME PAGE
        // Actions.somePage()
      })
      .catch((error) => {
        dispatch(getCategoriesFailure(error))
      })
  }
}
export function getCategories () {
  return dispatch => {
    dispatch(getCategoriesRequest())

    return BackendFactory().registerThisDevice(CONFIG.deviceUID).then((json) => {
      if(!json && !json.token) dispatch(getCategoriesFailure({error: 'err: never got token'}));
      return BackendFactory(json.token).getCategories()
    }).then((data) => {

      let json = (typeof data === 'string') ? JSON.parse(data): data;
      (json.status == 1) ?
        dispatch(getCategoriesSuccess(json.result)) :
        dispatch(getCategoriesFailure({error: 'err: server status 0'}));

      // GOTO SOME PAGE
      // Actions.somePage();
    })
      .catch((error) => {
        dispatch(getCategoriesFailure(error))
      })
  }
}
