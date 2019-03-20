import * as AT from './action-types';
import Cookies from 'js-cookie';

import { COOKIE_CHATS } from 'utils/app-constants';

const initialState = {
  isFetching: false,
  error: '',
  chats: [],
};

export default function MessagesReducer(state = initialState, action) {
  switch (action.type) {
    case AT.GET_ALL_CHATS:
      return {
        ...state,
        isFetching: true,
      };
    case AT.GET_ALL_CHATS_SUCCESS:
      return {
        ...state,
        chats: action.payload.chats,
        isFetching: false,
      };
    case AT.GET_ALL_CHATS_FAILED:
      return {
        ...state,
        isFetching: false,
        error: action.payload.error,
      };
    case AT.POST_MESSAGE:
      return {
        ...state,
        isFetching: true,
      };
    case AT.POST_MESSAGE_SUCCESS:
      return {
        ...state,
        isFetching: false,
        /////////
      };
    case AT.POST_MESSAGE_FAILED:
      return {
        ...state,
        isFetching: false,
        error: action.payload.error,
      };
    case AT.CREATE_CHAT:
      return {
        ...state,
        isFetching: true,
      };
    case AT.CREATE_CHAT_SUCCESS:
      return {
        ...state,
        isFetching: false,
        chats: state.chats.concat(action.payload.chat),
      };
    case AT.CREATE_CHAT_FAILED:
      return {
        ...state,
        isFetching: false,
        error: action.payload.error,
      };
    default:
      return { ...state };
  }
}
