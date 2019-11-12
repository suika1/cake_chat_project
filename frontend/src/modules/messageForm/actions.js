import * as AT from './action-types';

export const createMessage = ({ data }) => ({
  type: AT.CREATE_MESSAGE,
  payload: {
    data,
  },
});

export const createMessageSuccess = () => ({
  type: AT.CREATE_MESSAGE_SUCCESS,
});

export const createMessageFailed = ({ errorMessage }) => ({
  type: AT.CREATE_MESSAGE_FAILED,
  payload: {
    errorMessage,
  },
});

export const editMessage = ({
  text,
  messageId,
  chatId,
}) => ({
  type: AT.EDIT_MESSAGE,
  payload: {
    text,
    messageId,
    chatId,
  },
});

export const editMessageSuccess = ({
  messageId,
  text,
  chatId,
}) => ({
  type: AT.EDIT_MESSAGE_SUCCESS,
  payload: {
    messageId,
    text,
    chatId,
  },
});

export const editMessageFailed = ({ errorMessage }) => ({
  type: AT.EDIT_MESSAGE_FAILED,
  payload: {
    errorMessage,
  },
});
