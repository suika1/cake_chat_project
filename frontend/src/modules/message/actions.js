import * as AT from './action-types';

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
