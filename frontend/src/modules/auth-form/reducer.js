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
    case AT.CREATE_USER_SUCCESS:
      return {
        ...state,
        isFetching: false,
      };
    default:
      return state;
  }
}

export default AuthFormReducer;
