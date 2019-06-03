import { call, put, takeLatest } from 'redux-saga/effects';

import * as AT from './action-types';
import * as actions from './actions';

function* createUser({
  data,
}) {
  console.log('data from saga:', data);
}

function* watchCreateUser() {
  yield takeLatest(AT.CREATE_USER, createUser);
}

const authFormSagas = [
  watchCreateUser,
];

export default authFormSagas;
