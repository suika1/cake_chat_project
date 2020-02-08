import * as AT from './action-types';

export const createUser = ({ data }) => ({
  type: AT.CREATE_USER,
  payload: {
    data,
  },
});

export const createUserSuccess = ({ user }) => ({
  type: AT.CREATE_USER_SUCCESS,
  payload: {
    user,
  },
});

export const createUserFailed = ({ errorMessage }) => ({
  type: AT.CREATE_USER_FAILED,
  payload: {
    errorMessage,
  },
});

export const loginUser = ({ data }) => ({
  type: AT.LOGIN_USER,
  payload: {
    data,
  },
});

export const loginUserSuccess = ({ user }) => ({
  type: AT.LOGIN_USER_SUCCESS,
  payload: {
    user,
  },
});

export const loginUserFailed = ({ errorMessage }) => ({
  type: AT.LOGIN_USER_FAILED,
  payload: {
    errorMessage,
  },
});

export const setBackendError = ({ name, message }) => ({
  type: AT.SET_BACKEND_ERROR,
  payload: {
    name,
    message,
  },
});

export const clearBackendError = ({ name }) => ({
  type: AT.CLEAR_BACKEND_ERROR,
  payload: {
    name,
  },
});
