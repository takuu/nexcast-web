'use strict';

const {
  SESSION_TOKEN_REQUEST,
  SESSION_TOKEN_SUCCESS,
  SESSION_TOKEN_FAILURE,

  DELETE_TOKEN_REQUEST,
  DELETE_TOKEN_SUCCESS,

  LOGOUT,
  REGISTER,
  LOGIN,
  FORGOT_PASSWORD,

  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,

  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,

  ON_AUTH_FORM_FIELD_CHANGE,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,

  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILURE,

  REGISTER_DEVICE_REQUEST,
  REGISTER_DEVICE_SUCCESS,
  REGISTER_DEVICE_FAILURE,

} = require('../../lib/constants').default;

const BackendFactory = require('../../lib/BackendFactory').default

import {appAuthToken} from '../../lib/AppAuthToken'

const _ = require('underscore')

export function logoutState () {
  return {
    type: LOGOUT
  }
}
export function registerState () {
  return {
    type: REGISTER
  }
}

export function loginState () {
  return {
    type: LOGIN
  }
}

export function forgotPasswordState () {
  return {
    type: FORGOT_PASSWORD
  }
}

export function logoutRequest () {
  return {
    type: LOGOUT_REQUEST
  }
}

export function logoutSuccess () {
  return {
    type: LOGOUT_SUCCESS
  }
}
export function logoutFailure (error) {
  return {
    type: LOGOUT_FAILURE,
    payload: error
  }
}

export function logout () {
  return dispatch => {
    dispatch(logoutRequest())
    return appAuthToken.getSessionToken()

      .then((token) => {
        return BackendFactory(token).logout()
      })

      .then(() => {
        dispatch(loginState())
        dispatch(logoutSuccess())
        dispatch(deleteSessionToken())
      })

      .catch((error) => {
        dispatch(loginState())
        dispatch(logoutFailure(error))
      })
  }
}

export function onAuthFormFieldChange (field, value) {
  return {
    type: ON_AUTH_FORM_FIELD_CHANGE,
    payload: {field: field, value: value}
  }
}

export function signupRequest () {
  return {
    type: SIGNUP_REQUEST
  }
}
export function signupSuccess (json) {
  return {
    type: SIGNUP_SUCCESS,
    payload: json
  }
}
export function signupFailure (error) {
  return {
    type: SIGNUP_FAILURE,
    payload: error
  }
}

export function sessionTokenRequest () {
  return {
    type: SESSION_TOKEN_REQUEST
  }
}
export function sessionTokenRequestSuccess (token) {
  return {
    type: SESSION_TOKEN_SUCCESS,
    payload: token
  }
}
export function sessionTokenRequestFailure (error) {
  return {
    type: SESSION_TOKEN_FAILURE,
    payload: _.isUndefined(error) ? null : error
  }
}

export function deleteTokenRequest () {
  return {
    type: DELETE_TOKEN_REQUEST
  }
}
export function deleteTokenRequestSuccess () {
  return {
    type: DELETE_TOKEN_SUCCESS
  }
}

export function deleteSessionToken () {
  return dispatch => {
    dispatch(deleteTokenRequest())
    return appAuthToken.deleteSessionToken()
      .then(() => {
        dispatch(deleteTokenRequestSuccess())
      })
  }
}

export function getSessionToken () {
  return dispatch => {
    dispatch(sessionTokenRequest())
    return appAuthToken.getSessionToken()

      .then((token) => {
        if (token) {
          dispatch(sessionTokenRequestSuccess(token))
          dispatch(logoutState())
        } else {
          dispatch(sessionTokenRequestFailure())
        }
      })

      .catch((error) => {
        dispatch(sessionTokenRequestFailure(error))
        dispatch(loginState())
      })
  }
}

export function saveSessionToken (json) {
  return appAuthToken.storeSessionToken(json)
}

export function signup (username, email, password) {
  return dispatch => {
    dispatch(signupRequest())
    return BackendFactory().signup({
      username: username,
      email: email,
      password: password
    })

      .then((json) => {
        return saveSessionToken(
          Object.assign({}, json,
            { username: username,
              email: email
            })
          )
          .then(() => {
            dispatch(signupSuccess(
              Object.assign({}, json,
               { username: username,
                 email: email
               })
            ))
            dispatch(logoutState())
            // navigate to Tabbar
          })
      })
      .catch((error) => {
        dispatch(signupFailure(error))
      })
  }
}

export function loginRequest () {
  return {
    type: LOGIN_REQUEST
  }
}

export function loginSuccess (json) {
  return {
    type: LOGIN_SUCCESS,
    payload: json
  }
}

export function loginFailure (error) {
  return {
    type: LOGIN_FAILURE,
    payload: error
  }
}

export function login (username, password) {
  return dispatch => {
    dispatch(loginRequest())
    return BackendFactory().login({
      username: username,
      password: password
    })

      .then(function (json) {
        return saveSessionToken(json)
          .then(function () {
            dispatch(loginSuccess(json))
            // navigate to Tabbar
            dispatch(logoutState())
          })
      })
      .catch((error) => {
        dispatch(loginFailure(error))
      })
  }
}

export function registerDevice (id) {
  return dispatch => {
    dispatch(registerDeviceRequest())
    return BackendFactory().registerDevice(id)

      .then(function (json) {
        return saveSessionToken(json.token)
          .then(function () {
            dispatch(registerDeviceSuccess(json.token))
            // navigate to Tabbar
            //dispatch(logoutState())
          })
      })
      .catch((error) => {
        dispatch(registerDeviceFailure(error))
      })
  }
}

export function registerDeviceRequest () {
  return {
    type: REGISTER_DEVICE_REQUEST
  }
}

export function registerDeviceSuccess () {
  return {
    type: REGISTER_DEVICE_SUCCESS
  }
}

export function registerDeviceFailure (error) {
  return {
    type: REGISTER_DEVICE_FAILURE,
    payload: error
  }
}

export function resetPasswordRequest () {
  return {
    type: RESET_PASSWORD_REQUEST
  }
}

export function resetPasswordSuccess () {
  return {
    type: RESET_PASSWORD_SUCCESS
  }
}

export function resetPasswordFailure (error) {
  return {
    type: RESET_PASSWORD_FAILURE,
    payload: error
  }
}

export function resetPassword (email) {
  return dispatch => {
    dispatch(resetPasswordRequest())
    return BackendFactory().resetPassword({
      email: email
    })
      .then(() => {
        dispatch(loginState())
        dispatch(resetPasswordSuccess())
      })
      .catch((error) => {
        dispatch(resetPasswordFailure(error))
      })
  }
}
