import { combineReducers } from 'redux';

import chatList from './modules/chatList/reducer';
import chat from './modules/chat/reducer';

export default combineReducers({
  chatList,
  currentChat: chat,
});
