import * as AT from './action-types';

export const editMessage = () => ({
  type: AT.EDIT_MESSAGE,
});

export const editMessageSuccess = () => ({
  type: AT.EDIT_MESSAGE_SUCCESS,
});

export const editMessageFailed = () => ({
  type: AT.EDIT_MESSAGE_FAILED,
});

export const deleteMessage = () => ({
  type: AT.DELETE_MESSAGE,
});

export const deleteMessageSuccess = () => ({
  type: AT.DELETE_MESSAGE_SUCCESS,
});

export const deleteMessageFailed = () => ({
  type: AT.DELETE_MESSAGE_FAILED,
});

export const selectMessage = ({ chatId, messageId, text, authorId }) => ({
  type: AT.SELECT_MESSAGE,
  payload: {
    chatId,
    messageId,
    text,
    authorId,
  },
});

export const unselectMessage = ({ chatId, messageId }) => ({
  type: AT.UNSELECT_MESSAGE,
  payload: {
    chatId,
    messageId,
  },
});

export const unselectAllMessages = () => ({
  type: AT.UNSELECT_ALL_MESSAGES,
});
