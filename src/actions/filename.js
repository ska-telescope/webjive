import { SET_FILENAME } from './actionTypes';

export const setFilename = filename => dispatch => {
  dispatch({ type: SET_FILENAME, payload: filename });
};

export default setFilename;
