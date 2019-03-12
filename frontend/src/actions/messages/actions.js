import * as AT from './action-types';

export default {
  createChatRequest,
  createChatSuccess,
  createChatError,
  leftChat,
  getMessagesRequest,
  getMessagesSuccess,
  getInitialSuccess,
  getMessagesError,
  postMessageReqest,
  postMessageSuccess,
  postMessageError,
}

//Get action creators

//Chat actions
const createChatRequest = () => {
  return {
    type: AT.CREATE_CHAT_REQUEST,
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

const getMessagesRequest = (chatKey) => {
  return {
    type: AT.GET_MESSAGES_REQUEST,
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

const getInitialSuccess = ({
  newMessages,
  chatName,
  chatKey,
}) => {
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

const postMessageReqest = () => {
  return {
    type: AT.POST_MESSAGE_REQUEST,
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

