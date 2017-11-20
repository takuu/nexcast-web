'use strict'
const {
  LOGOUT,
  REGISTER,
  LOGIN,
  FORGOT_PASSWORD
} = require('../../lib/constants').default

export default function formValidation (state) {
  switch (state.form.state) {
    case LOGOUT:
      return state.setIn(['form', 'isValid'], true)

    case REGISTER:
      if (state.form.fields.username !== '' &&
          state.form.fields.email !== '' &&
          state.form.fields.password !== '' &&
          state.form.fields.passwordAgain !== '' &&
          !state.form.fields.usernameHasError &&
          !state.form.fields.emailHasError &&
          !state.form.fields.passwordHasError &&
        !state.form.fields.passwordAgainHasError) {
        return state.setIn(['form', 'isValid'], true)
      } else {
        return state.setIn(['form', 'isValid'], false)
      }
    case LOGIN:
      if (state.form.fields.username !== '' &&
          state.form.fields.password !== '' &&
          !state.form.fields.usernameHasError &&
          !state.form.fields.passwordHasError) {
        return state.setIn(['form', 'isValid'], true)
      } else {
        return state.setIn(['form', 'isValid'], false)
      }

    case FORGOT_PASSWORD:
      if (state.form.fields.email !== '' &&
        !state.form.fields.emailHasError) {
        return state.setIn(['form', 'isValid'], true)
      } else {
        return state.setIn(['form', 'isValid'], false)
      }

  }

  return state
}
