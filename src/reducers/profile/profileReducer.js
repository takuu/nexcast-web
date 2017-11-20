'use strict'

const fieldValidation = require('../../lib/fieldValidation').default
const formValidation = require('./profileFormValidation').default

const {
  ON_PROFILE_FORM_FIELD_CHANGE,
  GET_PROFILE_REQUEST,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_FAILURE,

  PROFILE_UPDATE_REQUEST,
  PROFILE_UPDATE_SUCCESS,
  PROFILE_UPDATE_FAILURE,

  LOGOUT_SUCCESS,

  SET_STATE
} = require('../../lib/constants').default

const InitialState = require('./profileInitialState').default
const initialState = new InitialState()

export default function profileReducer (state = initialState, action) {
  let nextProfileState = null

  if (!(state instanceof InitialState)) return initialState.mergeDeep(state)

  switch (action.type) {

    case GET_PROFILE_REQUEST:
    case PROFILE_UPDATE_REQUEST:
      return state.setIn(['form', 'isFetching'], true)
      .setIn(['form', 'error'], null)


    case PROFILE_UPDATE_SUCCESS:
      return state.setIn(['form', 'isFetching'], false)

    case GET_PROFILE_SUCCESS:
      nextProfileState = state.setIn(['form', 'isFetching'], false)
      .setIn(['form', 'fields', 'username'], action.payload.username)
      .setIn(['form', 'fields', 'email'], action.payload.email)
      .setIn(['form', 'fields', 'emailVerified'],
             action.payload.emailVerified)
      .setIn(['form', 'originalProfile', 'username'], action.payload.username)
      .setIn(['form', 'originalProfile', 'email'], action.payload.email)
      .setIn(['form', 'originalProfile', 'emailVerified'], action.payload.emailVerified)
      .setIn(['form', 'originalProfile', 'objectId'], action.payload.objectId)
      .setIn(['form', 'error'], null)

      return formValidation(
      fieldValidation(nextProfileState, action)
      , action)

    case LOGOUT_SUCCESS:
      nextProfileState = state.setIn(['form', 'fields', 'username'], '')
      .setIn(['form', 'fields', 'email'], '')
      .setIn(['form', 'fields', 'emailVerified'], false)
      .setIn(['form', 'originalProfile', 'username'], '')
      .setIn(['form', 'originalProfile', 'email'], '')
      .setIn(['form', 'originalProfile', 'emailVerified'], false)
      .setIn(['form', 'originalProfile', 'objectId'], null)
      .setIn(['form', 'error'], null)
      return formValidation(nextProfileState, action)

    case GET_PROFILE_FAILURE:
    case PROFILE_UPDATE_FAILURE:
      return state.setIn(['form', 'isFetching'], false)
      .setIn(['form', 'error'], action.payload)

    case ON_PROFILE_FORM_FIELD_CHANGE: {
      const {field, value} = action.payload
      let nextState = state
          .setIn(['form', 'fields', field], value)
          .setIn(['form', 'error'], null)

      return formValidation(
        fieldValidation(nextState, action),
        action
      )
    }

    case SET_STATE:
      var profile = JSON.parse(action.payload).profile.form
      var next = state.setIn(['form', 'disabled'], profile.disabled)
          .setIn(['form', 'error'], profile.error)
          .setIn(['form', 'isValid'], profile.isValid)
          .setIn(['form', 'isFetching'], profile.isFetching)
          .setIn(['form', 'originalProfile',
                  'username'], profile.originalProfile.username)
          .setIn(['form', 'originalProfile',
                  'email'], profile.originalProfile.email)
          .setIn(['form', 'originalProfile',
                  'objectId'], profile.originalProfile.objectId)
          .setIn(['form', 'originalProfile',
                  'emailVerified'], profile.originalProfile.emailVerified)
          .setIn(['form', 'fields',
                  'username'], profile.fields.username)
          .setIn(['form', 'fields',
                  'usernameHasError'], profile.fields.usernameHasError)
          .setIn(['form', 'fields',
                  'email'], profile.fields.email)
          .setIn(['form', 'fields',
                  'emailHasError'], profile.fields.emailHasError)
          .setIn(['form', 'fields',
                  'emailVerified'], profile.fields.emailVerified)
      return next

  }// switch
  /**
   * # Default
   */
  return state
}
