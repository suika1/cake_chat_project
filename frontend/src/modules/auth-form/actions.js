import * as AT from './action-types';

export const createUser = ({ data }) => ({
  type: AT.CREATE_USER,
  payload: {
    data,
  },
});

export const createUserSuccess = () => ({
  type: AT.CREATE_USER_SUCCESS,
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

export const loginUserSuccess = () => ({
  type: AT.LOGIN_USER_SUCCESS,
});

export const loginUserFailed = ({ errorMessage }) => ({
  type: AT.LOGIN_USER_FAILED,
  payload: {
    errorMessage,
  },
})
