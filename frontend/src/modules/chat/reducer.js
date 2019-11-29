import { SELECT_MESSAGE, UNSELECT_MESSAGE, UNSELECT_ALL_MESSAGES } from 'modules/message/action-types';

import { EDIT_MESSAGE_SUCCESS } from 'modules/messageForm/action-types';

import * as AT from './action-types';
import { RENAME_CHAT_SUCCESS } from './renameChat/action-types'
import { DELETE_MESSAGE_SUCCESS } from './messageActions/action-types';

const initialState = {
  isFetching: false,
  errorMessage: '',
  messages: [],
  selectedMessages: [],
}

const ChatReducer = (state = initialState, action) => {
  switch (action.type) {
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
    case SELECT_MESSAGE:
      return {
        ...state,
        selectedMessages: state.selectedMessages.concat([action.payload])
      };
    case UNSELECT_MESSAGE:
      return {
        ...state,
        selectedMessages: state.selectedMessages.filter((item) => {
          if (action.payload.messageId !== item.messageId) {
            return item
          }
        })
      };
    case UNSELECT_ALL_MESSAGES:
      return {
        ...state,
        selectedMessages: [],
      };
    case EDIT_MESSAGE_SUCCESS:
      return {
        ...state,
        messages: state.messages.map((item) => {
          if (action.payload.messageId !== item._id) return item;

          return {
            ...item,
            text: action.payload.text,
          }
        }),
        selectedMessages: [],
      };
    case DELETE_MESSAGE_SUCCESS: {
      return {
        ...state,
        messages: state.messages.filter((item) => {
          return action.payload.message.messageId !== item._id;
        }),
        selectedMessages: [],
      };
    }
    default:
      return state;
  }
};

export default ChatReducer;
