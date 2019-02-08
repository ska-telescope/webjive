import { SET_FILENAME } from '../actions/actionTypes';

export default function(state, action) {
  switch (action.type) {
    case SET_FILENAME:
      return action.payload;
    default:
      return state;
  }
}
