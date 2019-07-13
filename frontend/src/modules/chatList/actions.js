import * as AT from './action-types';

export const getChatList = () => ({
  type: AT.GET_CHAT_LIST,
});

export const getChatListSuccess = ({ chatList }) => ({
  type: AT.GET_CHAT_LIST_SUCCESS,
  payload: {
    chatList,
  },
});

export const getChatListFailed = ({ errorMessage }) => ({
  type: AT.GET_CHAT_LIST_FAILED,
  payload: {
    errorMessage,
  },
});

export const validateUser = () => ({
  type: AT.VALIDATE_USER,
});

export const validateUserSuccess = () => ({
  type: AT.VALIDATE_USER_SUCCESS,
});

export const validateUserFailed = ({ errorMessage }) => ({
  type: AT.VALIDATE_USER_FAILED,
  payload: {
    errorMessage,
  },
});

