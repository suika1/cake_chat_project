import * as AT from './action-types';

export {
  createChat,
  createChatSuccess,
  createChatError,
  leftChat,
  getMessages,
  getMessagesSuccess,
  getInitialSuccess,
  getMessagesError,
  postMessage,
  postMessageSuccess,
  postMessageError,
}

//Get action creators

//Chat actions
const createChat = chatName => {
  return {
    type: AT.CREATE_CHAT,
    chatName,
  };
};

const createChatSuccess = (chatKey, chatName) => {
  return {
    type: AT.CREATE_CHAT_SUCCESS,
    chatKey: chatKey,
    chatName: chatName,
  };
};

const createChatError = () => {
  return {
    type: AT.CREATE_CHAT_ERROR,
  };
};

const leftChat = chatKey => {
  return {
    type: AT.LEFT_CHAT,
    key: chatKey,
  };
};

const getMessages = chatKey => {
  return {
    type: AT.GET_MESSAGES,
    chatKey: chatKey,
  };
};

const getMessagesSuccess = (newMessages, chatKey) => {
  return {
    type: AT.GET_MESSAGES_SUCCESS,
    newMessages: newMessages,
    chatKey: chatKey,
  };
};

const getInitialSuccess = ({ newMessages, chatName, chatKey }) => {
  return {
    type: AT.GET_INITIAL_SUCCESS,
    newMessages: newMessages,
    chatName,
    chatKey: chatKey,
  };
};

const getMessagesError = () => {
  return {
    type: AT.GET_MESSAGES_ERROR,
  };
};

//Post action creators

const postMessage = () => {
  return {
    type: AT.POST_MESSAGE,
  };
};

const postMessageSuccess = () => {
  return {
    type: AT.POST_MESSAGE_SUCCESS,
  };
};

const postMessageError = () => {
  return {
    type: AT.POST_MESSAGE_ERROR,
  };
};
