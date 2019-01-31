import {
  PRELOAD_USER,
  PRELOAD_USER_FAILED,
  PRELOAD_USER_SUCCESS,
  LOGOUT,
  LOGOUT_SUCCESS,
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAILED
} from './actionTypes';

export function preloadUserSuccess(user) {
  const { username } = user;
  return { type: PRELOAD_USER_SUCCESS, username };
}

export function login(username, password) {
  return { type: LOGIN, username, password };
}

export function loginSuccess(user) {
  const { username } = user;
  return { type: LOGIN_SUCCESS, username };
}

export function loginFailed() {
  return { type: LOGIN_FAILED };
}

export function preloadUser() {
  return { type: PRELOAD_USER };
}

export function preloadUserFailed() {
  return { type: PRELOAD_USER_FAILED };
}

export function logout() {
  return { type: LOGOUT };
}

export function logoutSuccess() {
  return { type: LOGOUT_SUCCESS };
}
