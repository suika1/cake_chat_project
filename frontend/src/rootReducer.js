import { combineReducers } from 'redux';

import chatList from './modules/ChatList/reducer';
import chat from './modules/Chat/reducer';

export default combineReducers({
  chatList,
  currentChat: chat,
});
