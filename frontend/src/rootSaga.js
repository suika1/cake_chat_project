import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';

import chatListSagas from 'modules/chatList/sagas';
import chatSagas from 'modules/chat/sagas';
import messageFormSagas from 'modules/messageForm/sagas';
import authFormSagas from 'modules/auth-form/sagas';

export default  [
  ...authFormSagas,
  ...chatListSagas,
  ...chatSagas,
  ...messageFormSagas,
];
