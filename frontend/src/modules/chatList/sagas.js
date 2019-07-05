import {put, call, takeEvery} from 'redux-saga/effects';

import * as api from 'api';
import * as urls from 'api/urls';
import { getAuthToken } from 'api/localStorage'

import * as AT from './action-types';
import * as actions from './actions';

function* getChatList() {
  try {
    const response = yield call(api.get, {
      url: urls.chatListApi,
      headers: {
        Authorization: getAuthToken(),
      }
    });

    console.log(response)
    const { results: chatList, ok } = response;
    yield put(actions.getChatListSuccess({ chatList }))
  } catch (err) {
    yield put(actions.getChatListFailed({ errorMessage: err.message }));
  }
}

function* watchGetChatList() {
  yield takeEvery(AT.GET_CHAT_LIST, getChatList);
}

const chatListSagas = [
  watchGetChatList,
];

export default chatListSagas;
