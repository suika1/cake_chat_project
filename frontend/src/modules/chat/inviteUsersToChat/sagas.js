import { put, call, takeLatest } from 'redux-saga/effects';

import * as api from 'api';
import * as urls from 'api/urls';

import * as AT from './action-types';
import * as actions from './actions';


function* findAllUsersNotPresentedInChat({
  payload: {
    chatId,
  },
}) {
  try {
    const {
      ok,
      error,
      items,
    } = yield call(api.post, {
      url: `${urls.findAllUsersNotPresentedInChat}`,
      body: {
        chatId,
      },
    });

    if (ok) {
      yield put(actions.findAllUsersNotPresentedInChatSuccess({
        items,
      }));
    } else {
      throw new Error(error)
    }
  } catch (err) {
    yield put(actions.findAllUsersNotPresentedInChatFailed({
      errorMessage: err.message,
    }));
  }
}

function* inviteUsersToChat({
  payload: {
    userIds,
    chatId,
  },
}) {
  try {
    const {
      ok,
      error,
    } = yield call(api.post, {
      url: `${urls.inviteUsersToChat}`,
      body: {
        userIds,
        chatId,
      },
    });

    if (ok) {
      yield put(actions.inviteUsersToChatSuccess());
    } else {
      throw new Error(error)
    }
  } catch (err) {
    yield put(actions.inviteUsersToChatFailed({
      errorMessage: err.message,
    }));
  }
}

function* watchFindAllUsersNotPresentedInChat() {
  yield takeLatest(AT.FIND_ALL_USERS_NOT_PRESENTED_IN_CHAT, findAllUsersNotPresentedInChat);
}

function* watchInviteUsersToChat() {
  yield takeLatest(AT.INVITE_USERS_TO_CHAT, inviteUsersToChat);
}

export default [
  watchFindAllUsersNotPresentedInChat,
  watchInviteUsersToChat,
];
