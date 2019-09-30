import { VALIDATE_USER_SUCCESS } from 'modules/chatList/action-types';
import { LOGIN_USER_SUCCESS } from 'modules/auth-form/action-types';

const initialState = {
  user: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case VALIDATE_USER_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
      }
    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
      };
    default:
      return state;
  }
}
