import {
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT_SUCCESS,
  PRELOAD_USER_SUCCESS,
  PRELOAD_USER_FAILED,
  LOGOUT
} from '../actions/actionTypes';

const initialState = {
  // TODO: Having awaitingResponse as true seemed to break the login paths
  // need to investigate further when we un-stub A&A
  awaitingResponse: false,
  loginFailed: false
};

export default function user(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      return { ...state, awaitingResponse: true };
    case LOGIN_FAILED:
      return { ...state, awaitingResponse: false, loginFailed: true };
    case LOGIN_SUCCESS:
    case PRELOAD_USER_SUCCESS:
      return { ...state, username: action.username, awaitingResponse: false };
    case PRELOAD_USER_FAILED:
      return { ...state, awaitingResponse: false };
    case LOGOUT:
      return { ...state, awaitingResponse: true };
    case LOGOUT_SUCCESS:
      return { ...initialState, awaitingResponse: false };
    default:
      return state;
  }
}
