import * as AT from './action-types';

export {
  getAllChats,
  getAllChatsSuccess,
  getAllChatsFailed,

  createChat,
  createChatSuccess,
  createChatFailed,

  postMessage,
  postMessageSuccess,
  postMessageFailed,
}

const getAllChats = () => ({
  type: AT.GET_ALL_CHATS,
});

const getAllChatsSuccess = ({ chats }) => ({
  type: AT.GET_ALL_CHATS_SUCCESS,
  payload: {
    chats,
  },
});

const getAllChatsFailed = ({ error }) => ({
  type: AT.GET_ALL_CHATS_FAILED,
  payload: {
    error,
  },
});

const createChat = ({ chatName }) => ({
  type: AT.CREATE_CHAT,
  payload: {
    chatName,
  },
});

const createChatSuccess = ({ chat }) => ({
  type: AT.CREATE_CHAT_SUCCESS,
  payload: {
    chat,
  },
});

const createChatFailed = ({ error }) => ({
  type: AT.CREATE_CHAT_FAILED,
  payload: {
    error,
  },
});

const postMessage = ({ message }) => ({
  type: AT.POST_MESSAGE,
  payload: {
    message,
  },
});

const postMessageSuccess = ({ chat }) => ({
  type: AT.POST_MESSAGE,
  payload: {
    chat,
  },
});

const postMessageFailed = ({ error }) => ({
  type: AT.POST_MESSAGE_FAILED,
  payload: {
    error,
  },
});

