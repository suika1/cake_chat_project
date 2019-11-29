import { put, call, takeLatest } from 'redux-saga/effects';

import * as api from 'api';
import * as urls from 'api/urls';
import { getAuthToken } from 'api/localStorage';

import * as AT from './action-types';
import * as actions from './actions';

function* deleteMessage({
  payload: {
    message,
  },
}) {
  try {
    const {
      ok,
      error,
    } = yield call(api.deleteRequest, {
      url: `${urls.messageListApi}`,
      body: message,
    });

    if (ok) {
      yield put(actions.deleteMessageSuccess({
        message,
      }));
    } else {
      throw new Error(error)
    }
  } catch (err) {
    yield put(actions.deleteMessageFailed({
      errorMessage: err.message,
    }));
  }
}

function* watchDeleteMessage() {
  yield takeLatest(AT.DELETE_MESSAGE, deleteMessage)
}

export default [
  watchDeleteMessage,
];
