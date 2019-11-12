import { put, call, takeLatest } from 'redux-saga/effects';

import * as api from 'api';
import * as urls from 'api/urls';
import { getAuthToken } from 'api/localStorage'

import * as AT from './action-types';
import * as actions from './actions';

function* editMessage({ 
  payload: {
    chatId,
    messageId,
    text,
  }
}) {
  try {
    const response = yield call(api.putRequest, {
      url: urls.messageListApi,

      headers: {
        Authorization: getAuthToken(),
      },

      body: {
        chatId,
        messageId,
        text,
      }
    });

    const { ok, error } = response;

    if (ok) {
      yield put(actions.editMessageSuccess({ chatId, messageId, text }))
    } else {
      throw new Error(error)
    }
  } catch (err) {
    yield put(actions.editMessageFail({ errorMessage: err.message }));
  }
}

function* watchEditMessage() {
  yield takeLatest(AT.EDIT_MESSAGE, editMessage)
}

const editMessageSagas = [
  watchEditMessage,
]

export default editMessageSagas;
