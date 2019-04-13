import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';

import chatListSagas from 'modules/ChatList/sagas';
import chatSagas from 'modules/Chat/sagas';

export default  [
  ...chatListSagas,
  ...chatSagas,
];
