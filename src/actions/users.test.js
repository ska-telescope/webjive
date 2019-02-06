// Really quite trivial tests
import configureStore from 'redux-mock-store';
import * as userActions from './user';

const mockStore = configureStore();
const store = mockStore();
const dummyUser = { username: 'Glimmer' };

describe('user_actions', () => {
  beforeEach(() => {
    // Runs before each test in the suite
    store.clearActions();
  });

  describe('preloadUser', () => {
    test('triggers a PRELOAD_USER event', () => {
      const expectedActions = [
        {
          type: 'PRELOAD_USER'
        }
      ];
      store.dispatch(userActions.preloadUser());
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  describe('preloadUserSuccess', () => {
    test('triggers a PRELOAD_USER_SUCCESS event', () => {
      const expectedActions = [
        {
          username: 'Glimmer',
          type: 'PRELOAD_USER_SUCCESS'
        }
      ];

      store.dispatch(userActions.preloadUserSuccess(dummyUser));
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  describe('preloadUserFailed', () => {
    test('triggers a PRELOAD_USER_FAILED event', () => {
      const expectedActions = [
        {
          type: 'PRELOAD_USER_FAILED'
        }
      ];

      store.dispatch(userActions.preloadUserFailed());
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  describe('login', () => {
    test('triggers a  LOGIN event', () => {
      const expectedActions = [
        {
          password: 'Greyskull',
          username: 'Aurora',
          type: 'LOGIN'
        }
      ];
      store.dispatch(userActions.login(expectedActions[0].username, expectedActions[0].password));
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  describe('loginSuccess', () => {
    test('triggers a  LOGIN_SUCCESS event', () => {
      const expectedActions = [
        {
          username: 'Glimmer',
          type: 'LOGIN_SUCCESS'
        }
      ];
      store.dispatch(userActions.loginSuccess(dummyUser));
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  describe('loginFailed', () => {
    test('triggers a  LOGIN_FAILED event', () => {
      const expectedActions = [
        {
          type: 'LOGIN_FAILED'
        }
      ];
      store.dispatch(userActions.loginFailed());
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  describe('logout', () => {
    test('triggers a  LOGOUT event', () => {
      const expectedActions = [
        {
          type: 'LOGOUT'
        }
      ];
      store.dispatch(userActions.logout());
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  describe('logoutSuccess', () => {
    test('triggers a  LOGOUT_SUCCESS event', () => {
      const expectedActions = [
        {
          type: 'LOGOUT_SUCCESS'
        }
      ];
      store.dispatch(userActions.logoutSuccess());
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
