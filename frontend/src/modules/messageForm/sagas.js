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
    yield reduxSaga.call(api.post, { url: urls.messageListApi, body: data });
    yield reduxSaga.put(getMessages({ chatId: data.chatId }));
  } catch (err) {
    yield reduxSaga.put(actions.createMessageFailed({ errorMessage: err.message }));
  }
}

function* watchCreateMessage() {
  yield reduxSaga.takeLatest(AT.CREATE_MESSAGE, createMessage);
}

const messageFormSagas = [
  watchCreateMessage,
];

export default messageFormSagas;
