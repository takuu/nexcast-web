const {
  PLAYER_RESUME_REQUEST,
  PLAYER_PAUSE_REQUEST,
  PLAYER_STOP_REQUEST,
  PLAYER_START_REQUEST,
  PLAYER_SEEKTO_REQUEST,
  PLAYER_GOBACK_REQUEST,
  PLAYER_GOFORWARD_REQUEST,

  PLAYER_RESUME_SUCCESS,
  PLAYER_PAUSE_SUCCESS,
  PLAYER_STOP_SUCCESS,
  PLAYER_START_SUCCESS,
  PLAYER_SEEKTO_SUCCESS,
  PLAYER_GOBACK_SUCCESS,
  PLAYER_GOFORWARD_SUCCESS,

  PLAYER_RESUME_FAILURE,
  PLAYER_PAUSE_FAILURE,
  PLAYER_STOP_FAILURE,
  PLAYER_START_FAILURE,
  PLAYER_SEEKTO_FAILURE,
  PLAYER_GOBACK_FAILURE,
  PLAYER_GOFORWARD_FAILURE,

  PLAYER_MAXIMIZE_SUCCESS,
  PLAYER_MINIMIZE_SUCCESS,

} = require('../../lib/constants').default
import Immutable from 'immutable';



const initialState = new Immutable.Map();


const mapEntities = (state, newPlayDetail) => {
  return state.merge(newPlayDetail);
};


export default (state = initialState, action) => {
  switch(action.type) {
    // Handles some UI actions
    case PLAYER_SEEKTO_REQUEST:
    case PLAYER_PAUSE_REQUEST:
    case PLAYER_RESUME_REQUEST:
      if (!action.payload) { return state }
      return state.merge(action.payload);
    case PLAYER_START_REQUEST:
      break;

    case PLAYER_SEEKTO_SUCCESS:
    case PLAYER_GOFORWARD_SUCCESS:
    case PLAYER_GOBACK_SUCCESS:
    case PLAYER_START_SUCCESS:
    case PLAYER_PAUSE_SUCCESS:
    case PLAYER_RESUME_SUCCESS:
      if (!action.payload) { return state }
      return state.merge(action.payload);
    case PLAYER_RESUME_FAILURE:
    case PLAYER_START_FAILURE:
      break;

    case PLAYER_MAXIMIZE_SUCCESS:
      if (!action.payload) { return state }
      return state.merge(action.payload);

    case PLAYER_MINIMIZE_SUCCESS:
      if (!action.payload) { return state }
      return state.merge(action.payload);

    default:
      return state;

  }
  return state;
}
