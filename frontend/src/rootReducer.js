import { combineReducers } from 'redux';

import chatList from './modules/chatList/reducer';
import chat from './modules/chat/reducer';
import authForm from './modules/auth-form/reducer';

export default combineReducers({
  authForm,
  chatList,
  currentChat: chat,
});
