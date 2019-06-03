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
