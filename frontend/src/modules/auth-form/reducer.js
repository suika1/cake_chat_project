import * as AT from './action-types';

const initialState = {
  isFetching: false,
  backendErrors: {},
};

export default (state = initialState, action) => {
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
    case AT.SET_BACKEND_ERROR:
      return {
        ...state,
        backendErrors: {
          ...state.backendErrors,
          [action.payload.name]: action.payload.message,
        },
      };
    case AT.CLEAR_BACKEND_ERROR: {
      const { backendErrors } = state;
      const {
        name,
      } = action.payload;

      if (backendErrors[name]) {
        delete backendErrors[name];
      }

      return {
        ...state,
        backendErrors,
      };
    }
    default:
      return state;
  }
}
