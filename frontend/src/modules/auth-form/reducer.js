import * as AT from './action-types';

const initialState = {
  isFetching: false,
};

const AuthFormReducer = (state = initialState, action) => {
  switch (action.type) {
    case AT.CREATE_USER:
      return {
        ...state,
        isFetching: true,
      };
    case AT.CREATE_USER_FAILED:
      return {
        ...state,
        isFetching: false,
      };
    case AT.CREATE_USER_SUCCESS:
      return {
        ...state,
        isFetching: false,
      };
    case AT.LOGIN_USER:
      return {
        ...state,
        isFetching: true,
      };
    case AT.LOGIN_USER_FAILED:
      return {
        ...state,
        isFetching: false,
      };
    case AT.LOGIN_USER_SUCCESS:
      return {
        ...state,
        isFetching: false,
      };
    default:
      return state;
  }
}

export default AuthFormReducer;
