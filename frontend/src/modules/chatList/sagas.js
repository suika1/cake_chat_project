import {put, call, takeEvery, takeLatest} from 'redux-saga/effects';

import * as api from 'api';
import * as urls from 'api/urls';
import { getAuthToken, setAuthToken } from 'api/localStorage'

import * as AT from './action-types';
import { GET_MESSAGES_SUCCESS } from 'modules/chat/action-types'
import * as actions from './actions';

function* getChatList() {
  try {
    const response = yield call(api.get, {
      url: urls.chatListApi,
      headers: {
        Authorization: getAuthToken(),
      }
    });

    const { results: chatList, ok, error } = response;

    if (ok) {
      yield put(actions.getChatListSuccess({ chatList }))
    } else {
      setAuthToken(0)
      throw new Error(error)
    }
  } catch (err) {
    yield put(actions.getChatListFailed({ errorMessage: err.message }));
    //yield window.location.pathname = '/login';
  }
}

function* watchGetChatList() {
  yield takeEvery(AT.GET_CHAT_LIST, getChatList);
}

function* watchGetMessages() {
  yield takeLatest(GET_MESSAGES_SUCCESS, getChatList)
}

const chatListSagas = [
  watchGetChatList,
  watchGetMessages,
];

export default chatListSagas;
