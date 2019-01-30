import { createSelector } from 'reselect';

export function getUserState(state) {
  return state.user;
}

export const getIsLoggedIn = createSelector(
  getUserState,
  state => state.username != null
);

export const getUsername = createSelector(
  getUserState,
  state => state.username
);

export const getAwaitingResponse = createSelector(
  getUserState,
  state => state.awaitingResponse
);

export const getLoginFailure = createSelector(
  getUserState,
  state => state.loginFailed && !state.awaitingResponse
);
