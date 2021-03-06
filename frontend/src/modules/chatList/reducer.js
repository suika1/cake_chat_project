import { EDIT_CHAT_SUCCESS } from 'modules/chat/action-types';
import { CREATE_CHAT_SUCCESS } from 'modules/chatList/createChat/action-types';
import { DELETE_CHAT_SUCCESS } from 'modules/chat/deleteChat/action-types'
import { RENAME_CHAT_SUCCESS } from 'modules/chat/renameChat/action-types'
import { DELETE_MESSAGE_SUCCESS } from 'modules/chat/messageActions/action-types';

import * as AT from './action-types';

const initialState = {
  isFetching: false,
  errorMessage: '',
  elements: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AT.GET_CHAT_LIST:
      return {
        ...state,
        isFetching: true,
        errorMessage: '',
      };
    case AT.GET_CHAT_LIST_SUCCESS:
      return {
        ...state,
        isFetching: false,
        elements: [...action.payload.chatList],
      };
    case AT.GET_CHAT_LIST_FAILED:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload.errorMessage,
      };
    case EDIT_CHAT_SUCCESS:
      return {
        ...state,
        elements: state.elements.map(a => {
          if (a._id !== action.payload.changeId) {
            return a;
          }
          return action.payload.newChat;
        })
      }
    case CREATE_CHAT_SUCCESS:
      return {
        ...state,
        elements: state.elements.concat(action.payload.createdChat)
      }
    case DELETE_CHAT_SUCCESS:
      return {
        ...state,
        elements: state.elements.filter(
          (chat) => {
            if (chat._id !== action.payload.chatId) {
              return chat;
            }
          }),
      }
    case RENAME_CHAT_SUCCESS:
      return {
        ...state,
        elements: state.elements.map(
          (chat) => {
            if (chat._id !== action.payload.chatId) {
              return chat;
            }
            return {
              ...chat,
              name: action.payload.newName,
            }
          }),
      }
    case DELETE_MESSAGE_SUCCESS: {
      return {
        ...state,
        elements: state.elements.map(chat => {
          const {
            message,
          } = action.payload;

          if (chat._id === message.chatId) {
            return {
              ...chat,
              messages: chat.messages.filter(item => {
                return message.messageId !== item._id;
              }),
            };
          }
          return chat;
        }),
      };
    }
    default:
      return state;
  }
}
