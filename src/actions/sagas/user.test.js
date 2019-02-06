// Currently this is just a basic test that it is possible to
// log on successfully. When we are using the API properly it
// should be expanded.
import { call, take, put } from 'redux-saga/effects';
import { cloneableGenerator } from 'redux-saga/utils';
import { login } from './user';
import UserAPI from '../api/user';
import { LOGIN } from '../actionTypes';

import { loginSuccess } from '../user';

describe('The user login saga', () => {
  const username = 'Aurora';
  const password = 'Greyskull';
  const user = { username, password };

  const generator = cloneableGenerator(login)();

  it('takes the login request', () => {
    expect(generator.next(user).value).toEqual(take(LOGIN));
  });

  it('calls the login API', () => {
    const result = generator.next(user).value;
    expect(result).toEqual(call(UserAPI.login, username, password));
  });

  it('and is successful', () => {
    const result = generator.next(user).value;
    expect(result).toEqual(put(loginSuccess({ username })));
  });
});
