import * as AT from './action-types';

/* chat actions */

export const editChat = () => ({
  type: AT.EDIT_CHAT,
});

export const editChatSuccess = () => ({
  type: AT.EDIT_CHAT_SUCCESS,
});

export const editChatFailed = ({ errorMessage }) => ({
  type: AT.EDIT_CHAT_FAILED,
  payload: {
    errorMessage,
  },
});

/* messages actions */

export const getMessages = ({ chatId }) => ({
  type: AT.GET_MESSAGES,
  payload: {
    chatId,
  },
});

export const getMessagesSuccess = ({ results }) => ({
  type: AT.GET_MESSAGES_SUCCESS,
  payload: {
    results,
  },
});

export const getMessagesFailed = ({ errorMessage }) => ({
  type: AT.GET_MESSAGES_FAILED,
  payload: {
    errorMessage,
  },
});
