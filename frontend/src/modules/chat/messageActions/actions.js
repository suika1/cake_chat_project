import * as AT from './action-types';

export const selectMessageToEdit = ({ message }) => ({
  type: AT.SELECT_MESSAGE_TO_EDIT,
  payload: {
    message,
  },
});

export const deselectMessageToEdit = () => ({
  type: AT.DESELECT_MESSAGE_TO_EDIT,
});

export const deleteMessage = ({ message }) => ({
  type: AT.DELETE_MESSAGE,
  payload: {
    message,
  },
});

export const deleteMessageSuccess = ({ message }) => ({
  type: AT.DELETE_MESSAGE_SUCCESS,
  payload: {
    message,
  },
});

export const deleteMessageFailed = ({ errorMessage }) => ({
  type: AT.DELETE_MESSAGE_FAILED,
  payload: {
    errorMessage,
  },
});
