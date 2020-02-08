import * as AT from './action-types';

const initialState = {
  isFetching: false,
  inviteRequest: {
    isFetching: false,
    errorMessage: '',
  },
  allUsers: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AT.FIND_ALL_USERS_NOT_PRESENTED_IN_CHAT:
      return {
        ...state,
        isFetching: true,
      };
    case AT.FIND_ALL_USERS_NOT_PRESENTED_IN_CHAT_SUCCESS:
      return {
        ...state,
        isFetching: false,
        allUsers: action.payload.items,
      };
    case AT.FIND_ALL_USERS_NOT_PRESENTED_IN_CHAT_FAILED:
      return {
        ...state,
        isFetching: false,
      };
    case AT.INVITE_USERS_TO_CHAT:
      return {
        ...state,
        inviteRequest: {
          ...state.inviteRequest,
          isFetching: true,
        },
      };
    case AT.INVITE_USERS_TO_CHAT_SUCCESS:
      return {
        ...state,
        inviteRequest: {
          ...state.inviteRequest,
          isFetching: false,
          errorMessage: '',
        },
      };
    case AT.INVITE_USERS_TO_CHAT_FAILED:
      return {
        ...state,
        inviteRequest: {
          ...state.inviteRequest,
          isFetching: false,
          errorMessage: action.payload.errorMessage,
        },
      };
    default:
      return state;
  }
}
