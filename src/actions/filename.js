import { SET_FILENAME } from './actionTypes';

const getFileName = () => `webjive-layout-${new Date().getTime()}`;

export const setFilename = newFilename => dispatch => {
  console.log(newFilename);
  dispatch({ type: SET_FILENAME, payload: newFilename || getFileName() });
};
