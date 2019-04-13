import * as AT from './action-types';

export const createMessage = () => ({
  type: AT.CREATE_MESSAGE,
});

export const createMessageSuccess = () => ({
  type: AT.CREATE_MESSAGE_SUCCESS,
});

export const createMessageFailed = () => ({
  type: AT.CREATE_MESSAGE_FAILED,
});
