import setFilename from './filename';
import { SET_FILENAME } from '../actions/actionTypes';

describe('Filename reducer', () => {
  it('returns state by default', () => {
    const initialState = {};
    const action = { type: null, payload: null };
    const result = setFilename(initialState, action);
    expect(result).toEqual(initialState);
  });

  it('returns the action payload on set filename', () => {
    const payload = 'test string';
    const action = { type: SET_FILENAME, payload };
    const result = setFilename(null, action);
    expect(result).toEqual(payload);
  });
});
