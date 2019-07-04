import { combineReducers } from 'redux';
import history from 'api/browserHistory';
import { connectRouter } from 'connected-react-router';

import chatList from './modules/chatList/reducer';
import chat from './modules/chat/reducer';
import authForm from './modules/auth-form/reducer';

export default combineReducers({
  router: connectRouter(history),
  authForm,
  chatList,
  currentChat: chat,
});
