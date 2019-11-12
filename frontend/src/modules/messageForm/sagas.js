import * as reduxSaga from 'redux-saga/effects';

import * as api from 'api';
import * as urls from 'api/urls';

import * as AT from './action-types';
import * as actions from './actions';
import { getMessages } from 'modules/chat/actions';

function* createMessage({
  payload: {
    data,
  },
}) {
  try {
    yield reduxSaga.call(api.post, { 
      url: urls.messageListApi, 
      body: data,
    });
    yield reduxSaga.put(getMessages({ chatId: data.chatId }));
  } catch (err) {
    yield reduxSaga.put(actions.createMessageFailed({ errorMessage: err.message }));
  }
}

function* updateMessage({
  payload: {
    messageId,
    text,
    chatId,
  },
}) {
  try {
    yield reduxSaga.call(api.put, {
      url: urls.messageListApi,
      body: {
        text,
        messageId,
        chatId,
      },
    });

    yield reduxSaga.put(actions.editMessageSuccess({
      messageId,
      text,
      chatId,
    }));
  } catch (err) {
    yield reduxSaga.put(actions.editMessageFailed({ errorMessage: err.message }));
  }
}

function* watchCreateMessage() {
  yield reduxSaga.takeLatest(AT.CREATE_MESSAGE, createMessage);
}

function* watchUpdateMessage() {
  yield reduxSaga.takeLatest(AT.EDIT_MESSAGE, updateMessage);
}

const messageFormSagas = [
  watchCreateMessage,
  watchUpdateMessage,
];

export default messageFormSagas;
