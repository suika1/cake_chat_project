import * as reduxSaga from 'redux-saga/effects';
import * as AT from './action-types';
import * as actions from './actions';
// getMessages

function* getMessages() {
  try {
    yield reduxSaga.put(actions.getMessagesSuccess());
  } catch (err) {
    yield reduxSaga.put(actions.getMessagesFailed());
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
