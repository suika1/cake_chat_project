import {
  GET_MESSAGES_ERROR,
  GET_MESSAGES_REQUEST,
  GET_MESSAGES_SUCCESS,
  GET_INITIAL_SUCCESS,
  POST_MESSAGE_REQUEST,
  POST_MESSAGE_ERROR,
  POST_MESSAGE_SUCCESS,
  CREATE_CHAT_REQUEST,
  CREATE_CHAT_SUCCESS,
  CREATE_CHAT_ERROR,
  LEFT_CHAT,
  COOKIE_CHATS
} from "../actions/MessageActions";
import Cookies from "js-cookie";

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
      [
        { key: "TDa5LTBPjRpKS4c7GxOOr3-qyVj9EZ", name: "Initial chat 1" },
        { key: "xHyfLTU7giMi77_EwGnAhwVduVDhUB", name: "Initial chat 2" }
      ],
      { expires: 1000 }
    );
  return Cookies.getJSON(COOKIE_CHATS);
}

export default function MessagesReducer(state = initialState, action) {
  console.log(`cookies === `) || console.log(Cookies.getJSON(COOKIE_CHATS));
  switch (action.type) {
    case GET_MESSAGES_REQUEST:
      //console.log(`before get::`) || console.log(initialState.messages);
      return { ...state, error: "", isFetching: true };
    case GET_MESSAGES_SUCCESS: {
      let prevMsg = state.messages.find(a => a.chatKey === action.chatKey).msg; // find previous messages for this chat
      //console.log(`prev msg ===`) || console.log(prevMsg);
      if (!prevMsg) {
        //if by this key no msg were stored - convert them to empty array
        prevMsg = [];
      }
      let newChatKey = null;
      if (!state.chats.find(a => a.key === action.chatKey)) {
        //if this chat key is first time used by this user
        //console.log(`adding new chatKey: ${action.chatKey}`);
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
    case GET_INITIAL_SUCCESS: {
      let newChatKey = null;
      if (!state.chats.find(a => a.key === action.chatKey)) {
        //if this chat key is first time used by this user
        console.log(`adding new chatKey: ${action.chatKey}`);
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
    case GET_MESSAGES_ERROR:
      return { ...state, isFetching: false, error: "Get error" };
    case POST_MESSAGE_REQUEST:
      return { ...state, error: "", isFetching: true };
    case POST_MESSAGE_SUCCESS:
      return { ...state, error: "", isFetching: false };
    case POST_MESSAGE_ERROR:
      return { ...state, isFetching: false, error: "Post error" };
    case CREATE_CHAT_REQUEST:
      return { ...state, isFetching: false, error: "" };
    case CREATE_CHAT_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: "",
        chats: [...state.chats, { key: action.chatKey, name: action.chatName }]
      };
    case CREATE_CHAT_ERROR:
      return { ...state, isFetching: false, error: "create chat error" };
    case LEFT_CHAT:
      return {
        ...state,
        chats: state.chats.filter(a => a.key !== action.key),
        messages: state.messages.filter(a => a.chatKey !== action.key)
      };
    default:
      return { ...state };
  }
}
