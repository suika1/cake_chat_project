import * as AT from './action-types';
import { SELECT_MESSAGE_TO_EDIT, DESELECT_MESSAGE_TO_EDIT } from 'modules/chat/messageActions/action-types';

const initialState = {
  messageToEdit: null,
  isFetching: false,
  errorMessage: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SELECT_MESSAGE_TO_EDIT:
      return {
        ...state,
        messageToEdit: action.payload.message,
      };
    case DESELECT_MESSAGE_TO_EDIT:
      return {
        ...state,
        messageToEdit: null,
      };
    case AT.EDIT_MESSAGE:
      return {
        ...state,
        isFetching: true,
        errorMessage: '',
      };
    case AT.EDIT_MESSAGE_SUCCESS:
      return {
        ...state,
        messageToEdit: null,
        isFetching: false,
      };
    case AT.EDIT_MESSAGE_FAILED:
      return {
        ...state,
        isFetching: false,
        errorMessage: '',
      };
    default:
      return state;
  }
}
