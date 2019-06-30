import { call, put, takeLatest } from 'redux-saga/effects';

import * as api from 'api';
import * as urls from 'api/urls';
import { setAuthToken } from 'api/localStorage'

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
        'email': data.regEmail,
        'name': data.regName,
        'password': data.regPassword,
      }
    })
    
    if (response.ok) {
      setAuthToken(response.token);
      yield put(actions.createUserSuccess());
    } else {
      throw new Error(results.error);
    }
  } catch (error) {
    yield put(actions.createUserFailed({errorMessage: error.message}));
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
  try {
    const response = yield call(api.post, {
      url: urls.validate,
      body: {
        'email': data.loginEmail,
        'password': data.loginPassword,
      }
    })
    
    if (response.ok) {
      setAuthToken(response.token);
      yield put(actions.loginUserSuccess());
    } else {
      throw new Error(response.error);
    }
  } catch (error) {
    yield put(actions.loginUserFailed({errorMessage: error.message}));
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
