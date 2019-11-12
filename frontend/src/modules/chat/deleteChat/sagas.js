import {put, call, takeLatest} from 'redux-saga/effects';

import * as api from 'api';
import * as urls from 'api/urls';
import { getAuthToken } from 'api/localStorage'

import * as AT from './action-types';
import * as actions from './actions';

function* deleteChat({ 
	payload: {
		chatId
	}
}) {
	try {
		const response = yield call(api.deleteRequest, {
			url: urls.chatListApi,

			headers: {
        Authorization: getAuthToken(),
			},

			body: {
				chatId,
			}
		});

		const { ok, error } = response;

		if (ok) {
			yield put(actions.deleteChatSuccess({ chatId }))
		} else {
			throw new Error(error)
		}
	} catch (err) {
		yield put(actions.deleteChatFail({ errorMessage: err.message }));
	}
}

function* watchDeleteChat() {
	yield takeLatest(AT.DELETE_CHAT, deleteChat)
}

const deleteChatSagas = [
	watchDeleteChat,
]

export default deleteChatSagas;
