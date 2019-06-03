import * as reduxSaga from 'redux-saga/effects';

import * as AT from './action-types';
import * as actions from './actions';

import * as api from 'api';
import * as urls from 'api/urls';

function* getMessages({
  payload: {
    chatId,
  },
}) {
  try {
    const {
      results: {
        messages,
      },
    } = yield reduxSaga.call(api.get, { url: `${urls.chatListApi}${chatId}`});
    yield reduxSaga.put(actions.getMessagesSuccess({ results: messages }));
  } catch (err) {
    yield reduxSaga.put(actions.getMessagesFailed({ errorMessage: err.message }));
  }
}

function* editChat() {
  try {
    yield reduxSaga.put(actions.editChatSuccess());
  } catch (err) {
    yield reduxSaga.put(actions.editChatFailed())
  }
}

function* watchGetMessages() {
  yield reduxSaga.takeLatest(AT.GET_MESSAGES, getMessages);
}

function* watchEditChat() {
  yield reduxSaga.takeLatest(AT.EDIT_CHAT, editChat);
}

const ChatSagas = [
  watchGetMessages,
  watchEditChat,
];

export default ChatSagas;
