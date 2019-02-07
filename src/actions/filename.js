import { SET_FILENAME } from './actionTypes';

const setFilename = newFilename => dispatch => {
  dispatch({ type: SET_FILENAME, payload: newFilename });
};

export default setFilename;
