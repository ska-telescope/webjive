import { SET_FILENAME } from '../actions/actionTypes';

export default function(state = null, action) {
  switch (action.type) {
    case SET_FILENAME:
      return action.payload;
    default:
      return state;
  }
}
