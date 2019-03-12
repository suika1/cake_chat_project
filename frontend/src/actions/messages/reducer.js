import * as AT from "./action-types";
import Cookies from "js-cookie";

import { COOKIE_CHATS } from 'utils/app-constants';

const initialState = {
  messages: [],
  isFetching: false,
  error: "",
  chats: initCookies()
};

function initCookies() {
  if (!Cookies.getJSON(COOKIE_CHATS))
    Cookies.set(
      COOKIE_CHATS,
      [],
      { expires: 1000 }
    );
  return Cookies.getJSON(COOKIE_CHATS);
}

export default function MessagesReducer(state = initialState, action) {
  switch (action.type) {
    case AT.GET_MESSAGES_REQUEST:
      return { ...state, error: "", isFetching: true };
    case AT.GET_MESSAGES_SUCCESS: {
      let prevMsg = state.messages.find(a => a.chatKey === action.chatKey).msg; // find previous messages for this chat
      if (!prevMsg) {
        //if by this key no msg were stored - convert them to empty array
        prevMsg = [];
      }
      let newChatKey = null;
      if (!state.chats.find(a => a.key === action.chatKey)) {
        //if this chat key is first time used by this user
        Cookies.set(
          COOKIE_CHATS,
          [
            ...Cookies.getJSON(COOKIE_CHATS),
            { key: action.chatKey, name: "Fix this" }
          ],
          { expires: 1000 }
        );
        newChatKey = action.chatKey;
      }
      let newMessages = [];
      state.messages.forEach(a => {
        if (a.chatKey === action.chatKey) {
          //add new messages for this chatKey
          newMessages = newMessages.concat({
            chatKey: action.chatKey,
            msg: prevMsg.concat(action.newMessages)
          });
        } else newMessages = newMessages.concat(a); //don't touch other chatKeys
      });
      return {
        chats: newChatKey
          ? [...state.chats, { key: newChatKey, name: "Fix thix" }]
          : state.chats,
        error: "",
        isFetching: false,
        messages: newMessages
      };
    }
    case AT.GET_INITIAL_SUCCESS: {
      let newChatKey = null;
      if (!state.chats.find(a => a.key === action.chatKey)) {
        //if this chat key is first time used by this user
        Cookies.set(
          COOKIE_CHATS,
          [
            ...Cookies.getJSON(COOKIE_CHATS),
            { key: action.chatKey, name: "Fix this" }
          ],
          { expires: 1000 }
        );
        newChatKey = action.chatKey;
      }
      let newMessages = [];
      if (state.messages.find(a => a.chatKey === action.chatKey)) {
        //if somehow messages are initializing not first time
        state.messages.forEach(a => {
          if (a.chatKey === action.chatKey) {
            //set messages for this chatKey
            newMessages = newMessages.concat({
              chatKey: action.chatKey,
              msg: action.newMessages
            });
          } else newMessages = newMessages.concat(a); //don't touch other chatKeys
        });
      } else {
        //casual situation
        newMessages = state.messages.concat({
          chatKey: action.chatKey,
          msg: action.newMessages
        });
      }
      return {
        chats: newChatKey
          ? [...state.chats, { key: newChatKey, name: "Fix thix" }]
          : state.chats,
        error: "",
        isFetching: false,
        messages: newMessages
      };
    }
    case AT.GET_MESSAGES_ERROR:
      return { ...state, isFetching: false, error: "Get error" };
    case AT.POST_MESSAGE_REQUEST:
      return { ...state, error: "", isFetching: true };
    case AT.POST_MESSAGE_SUCCESS:
      return { ...state, error: "", isFetching: false };
    case AT.POST_MESSAGE_ERROR:
      return { ...state, isFetching: false, error: "Post error" };
    case AT.CREATE_CHAT_REQUEST:
      return { ...state, isFetching: false, error: "" };
    case AT.CREATE_CHAT_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: "",
        chats: [...state.chats, { key: action.chatKey, name: action.chatName }]
      };
    case AT.CREATE_CHAT_ERROR:
      return { ...state, isFetching: false, error: "create chat error" };
    case AT.LEFT_CHAT:
      return {
        ...state,
        chats: state.chats.filter(a => a.key !== action.key),
        messages: state.messages.filter(a => a.chatKey !== action.key)
      };
    default:
      return { ...state };
  }
}
