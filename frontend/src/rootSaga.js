import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';

import chatListSagas from 'modules/chatList/sagas';
import createChatSagas from './modules/chatList/createChat/sagas';
import chatSagas from 'modules/chat/sagas';
import deleteChatSagas from 'modules/chat/deleteChat/sagas';
import renameChatSaga from 'modules/chat/renameChat/sagas';
import messageFormSagas from 'modules/messageForm/sagas';
import authFormSagas from 'modules/auth-form/sagas';

export default  [
	...authFormSagas,
	...chatListSagas,
	...createChatSagas,
	...chatSagas,
	...messageFormSagas,
	...deleteChatSagas,
	...renameChatSaga,
];
