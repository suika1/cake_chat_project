import * as AT from './action-types';

export const findAllUsersNotPresentedInChat = ({ chatId }) => ({
  type: AT.FIND_ALL_USERS_NOT_PRESENTED_IN_CHAT,
  payload: {
    chatId,
  },
});

export const findAllUsersNotPresentedInChatSuccess = ({ items }) => ({
  type: AT.FIND_ALL_USERS_NOT_PRESENTED_IN_CHAT_SUCCESS,
  payload: {
    items,
  },
});

export const findAllUsersNotPresentedInChatFailed = ({ errorMessage }) => ({
  type: AT.FIND_ALL_USERS_NOT_PRESENTED_IN_CHAT_FAILED,
  payload: {
    errorMessage,
  },
});

export const inviteUsersToChat = ({
  userIds,
  chatId,
}) => ({
  type: AT.INVITE_USERS_TO_CHAT,
  payload: {
    userIds,
    chatId,
  },
});

export const inviteUsersToChatSuccess = () => ({
  type: AT.INVITE_USERS_TO_CHAT_SUCCESS,
});

export const inviteUsersToChatFailed = ({ errorMessage }) => ({
  type: AT.INVITE_USERS_TO_CHAT_FAILED,
  payload: {
    errorMessage,
  },
});
