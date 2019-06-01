import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';

import chatListSagas from 'modules/chatList/sagas';
import chatSagas from 'modules/chat/sagas';
import messageFormSagas from 'modules/messageForm/sagas';

export default  [
  ...chatListSagas,
  ...chatSagas,
  ...messageFormSagas,
];
