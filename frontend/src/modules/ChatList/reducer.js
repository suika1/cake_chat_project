import * as AT from './action-types';
import { EDIT_CHAT_SUCCESS } from 'modules/chat/action-types';

const initialState = {
  isFetching: false,
  errorMessage: '',
  elements: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AT.GET_CHAT_LIST:
      return {
        ...state,
        isFetching: true,
        errorMessage: '',
      };
    case AT.GET_CHAT_LIST_SUCCESS:
      return {
        ...state,
        isFetching: false,
        elements: [...action.payload.chatList],
      };
    case AT.GET_CHAT_LIST_FAILED:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload.errorMessage,
      };
    case EDIT_CHAT_SUCCESS:
      return {
        ...state,
        elements: state.elements.map(a => {
          if (a._id !== action.payload.changeId) {
            return a;
          }
          return action.payload.newChat;
        })
      }
    default:
      return state;
  }
}
