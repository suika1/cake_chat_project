import {put, call, takeLatest} from 'redux-saga/effects';

import * as api from 'api';
import * as urls from 'api/urls';
import { getAuthToken } from 'api/localStorage'

import * as AT from './action-types';
import * as actions from './actions';

function* createChat({ 
	payload: {
		chatName
	}
}) {
	try {
		const response = yield call(api.post, {
			url: urls.chatListApi,
			headers: {
        Authorization: getAuthToken(),
			},
			body: {
				name: chatName
			}
		});

		const { createdChat, ok, error} = response;

		if (ok) {
			yield put(actions.createChatSuccess({ createdChat }))
		} else {
			throw new Error(error)
		}
	} catch (err) {
		yield put(actions.createChatFail({ errorMessage: err.message }));
	}
}

function* watchCreateChat() {
	yield takeLatest(AT.CREATE_CHAT, createChat)
}

const createChatSagas = [
	watchCreateChat,
]

export default createChatSagas;