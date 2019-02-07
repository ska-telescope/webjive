import { SET_FILENAME } from './actionTypes';

export const setFilename = newFilename => dispatch => {
  console.log(newFilename);
  dispatch({ type: SET_FILENAME, payload: newFilename });
};
