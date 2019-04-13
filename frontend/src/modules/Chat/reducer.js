import * as AT from './action-types';

const initialState = {
  isFetching: false,
  errorMessage: '',
  messages: [],
}

const ChatReducer = (state = initialState, action) => {
  switch(action.type) {
    case AT.EDIT_CHAT:
      return {
        ...state,
        isFetching: true,
      };
    case AT.EDIT_CHAT_FAILED:
      return {
        ...state,
        errorMessage: action.payload.errorMessage,
        isFetching: false,
      };
    case AT.EDIT_CHAT_SUCCESS:
      // ChatName changing logic in ChatList reducer
      return {
        ...state,
        isFetching: false,
      };

    case AT.GET_MESSAGES:
      return {
        ...state,
        isFetching: true,
      };
    case AT.GET_MESSAGES_SUCCESS:
      return {
        ...state,
        messages: action.payload.messages,
        isFetching: false,
      };
    case AT.GET_MESSAGES_FAILED:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload.errorMessage,
      };
    
    default:
      return state;
  }
};

export default ChatReducer;
