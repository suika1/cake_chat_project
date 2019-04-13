import * as AT from './action-types';

/* chat actions */

export const editChat = () => ({
  type: AT.EDIT_CHAT,
});

export const editChatSuccess = () => ({
  type: AT.EDIT_CHAT_SUCCESS,
});

export const editChatFailed = () => ({
  type: AT.EDIT_CHAT_FAILED,
});

/* messages actions */

export const getMessages = () => ({
  type: AT.GET_MESSAGES,
});

export const getMessagesSuccess = () => ({
  type: AT.GET_MESSAGES_SUCCESS,
});

export const getMessagesFailed = () => ({
  type: AT.GET_MESSAGES_FAILED,
});
