import * as AT from './action-types';
import { RENAME_CHAT_SUCCESS } from './renameChat/action-types'

const initialState = {
  isFetching: false,
  errorMessage: '',
  messages: [],
}

const ChatReducer = (state = initialState, action) => {
  switch(action.type) {
    case AT.EDIT_CHAT:
      return {
        ...state,
        isFetching: true,
      };
    case AT.EDIT_CHAT_FAILED:
      return {
        ...state,
        errorMessage: action.payload.errorMessage,
        isFetching: false,
      };
    case RENAME_CHAT_SUCCESS:
      // ChatName changing logic in ChatList reducer
      return {
        ...state,
        chatName: action.payload.newName,
      };

    case AT.GET_MESSAGES:
      return {
        ...state,
        isFetching: true,
        messages: [],
        chatName: '',
      };
    case AT.GET_MESSAGES_SUCCESS:
      return {
        ...state,
        messages: action.payload.results,
        isFetching: false,
        chatName: action.payload.chatName,
      };
    case AT.GET_MESSAGES_FAILED:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload.errorMessage,
        chatName: '',
      };
    
    default:
      return state;
  }
};

export default ChatReducer;
