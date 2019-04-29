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
