import { call, put, takeLatest } from 'redux-saga/effects';

import * as api from 'api';
import * as urls from 'api/urls';
import { setAuthToken, setUserInfo } from 'api/localStorage'
import history from 'api/browserHistory'

import * as AT from './action-types';
import * as actions from './actions';

function* createUser({
  payload: {
    data
  },
}) {
  try {
    const response = yield call(api.post, {
      url: urls.userListApi,
      body: {
        email: data.regEmail,
        name: data.regName,
        password: data.regPassword,
      }
    })

    if (response.ok) {
      setAuthToken(response.token);

      yield put(actions.createUserSuccess({
        user: response.results,
      }));
      yield history.push('/chats');
    } else {
      throw new Error(response.error);
    }
  } catch (error) {
    yield put(actions.createUserFailed({ errorMessage: error.message }));
  }
}

function* watchCreateUser() {
  yield takeLatest(AT.CREATE_USER, createUser);
}

function* loginUser({
  payload: {
    data
  },
}) {
  const mapBackendNamesToFrontendNames = {
    email: 'loginEmail',
    password: 'loginPassword',
  };

  let error = null;

  try {
    const response = yield call(api.post, {
      url: urls.login,
      body: Object.entries(data).reduce((prev, [name, val]) => {
        const matchingEntry = Object.entries(mapBackendNamesToFrontendNames)
          .find(([, frontendName]) => frontendName === name);

        const matchingBackendName = matchingEntry && matchingEntry[0];

        if (matchingBackendName) {
          prev[matchingBackendName] = val;
        }
        return prev;
      }, {}),
    });

    if (response.ok) {
      setAuthToken(response.token);

      const user = response.results;

      yield call(setUserInfo, user);
      yield put(actions.loginUserSuccess({ user }));
      yield history.push('/chats');
    } else {
      ({ error } = response);
      throw new Error();
    }
  } catch (e) {
    yield put(actions.loginUserFailed({ errorMessage: error.message }));
    yield put(actions.setBackendError({
      name: mapBackendNamesToFrontendNames[error.field],
      message: error.message,
    }));
  }
}

function* watchLoginUser() {
  yield takeLatest(AT.LOGIN_USER, loginUser)
}

const authFormSagas = [
  watchCreateUser,
  watchLoginUser,
];

export default authFormSagas;
