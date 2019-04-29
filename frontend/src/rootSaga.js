import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';

import chatListSagas from 'modules/ChatList/sagas';
import chatSagas from 'modules/Chat/sagas';
import messageFormSagas from 'modules/MessageForm/sagas';

export default  [
  ...chatListSagas,
  ...chatSagas,
  ...messageFormSagas,
];
