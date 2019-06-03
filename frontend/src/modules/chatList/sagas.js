import * as reduxSaga from 'redux-saga/effects';

import * as api from 'api';
import * as urls from 'api/urls';

import * as AT from './action-types';
import * as actions from './actions';

function* getChatList() {
  try {
    const response = yield reduxSaga.call(api.get, {
      url: urls.chatListApi,
    });
    const { results: chatList, ok } = response;
    yield reduxSaga.put(actions.getChatListSuccess({ chatList }))
  } catch (err) {
    yield reduxSaga.put(actions.getChatListFailed({ errorMessage: err.message }));
  }
}

function* watchGetChatList() {
  yield reduxSaga.takeEvery(AT.GET_CHAT_LIST, getChatList);
}

const chatListSagas = [
  watchGetChatList,
];

export default chatListSagas;
