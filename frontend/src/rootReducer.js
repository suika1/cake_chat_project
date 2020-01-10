import { combineReducers } from 'redux';
import history from 'api/browserHistory';
import { connectRouter } from 'connected-react-router';

import currentUser from 'reducers/currentUser';

import chatList from './modules/chatList/reducer';
import createChat from './modules/chatList/createChat/reducer';
import chat from './modules/chat/reducer';
import deleteChat from './modules/chat/deleteChat/reducer';
import renameChat from './modules/chat/renameChat/reducer';
import authForm from './modules/auth-form/reducer';
import messageForm from './modules/messageForm/reducer';

export default combineReducers({
  router: connectRouter(history),
  authForm,
  chatList,
  createChat,
  currentChat: chat,
  currentUser,
  deleteChat,
  renameChat,
  messageForm,
});
