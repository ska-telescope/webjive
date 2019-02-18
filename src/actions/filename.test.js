import configureStore from 'redux-mock-store';
import { SET_FILENAME } from './actionTypes';
import * as filenameActions from './filename';

const mockStore = configureStore();
const store = mockStore();

describe('Filename actions', () => {
  beforeEach(() => {
    store.clearActions();
  });

  describe('setFilename', () => {
    it('triggers a SET_FILENAME event', () => {
      const expectedActions = [
        {
          type: SET_FILENAME
        }
      ];
      store.dispatch(filenameActions.setFilename());
      expect(store.getActions()).toEqual(expectedActions);
    });

    it('has the expected payload when provided', () => {
      const payload = 'test string';
      const expectedActions = [
        {
          type: SET_FILENAME,
          payload
        }
      ];
      store.dispatch(filenameActions.setFilename(payload));
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
