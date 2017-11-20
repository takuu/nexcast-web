
'use strict'

const {Record} = require('immutable')

const Form = Record({
  originalProfile: new (Record({
    username: null,
    email: null,
    objectId: null,
    emailVerified: null
  }))(),
  disabled: false,
  error: null,
  isValid: false,
  isFetching: false,
  fields: new (Record({
    username: '',
    usernameHasError: false,
    usernameErrorMsg: '',
    email: '',
    emailHasError: false,
    emailErrorMsg: '',
    emailVerified: false
  }))()
})

var InitialState = Record({
  form: new Form()
})

export default InitialState
