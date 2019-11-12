import {put, call, takeLatest} from 'redux-saga/effects';

import * as api from 'api';
import * as urls from 'api/urls';
import { getAuthToken } from 'api/localStorage'

import * as AT from './action-types';
import * as actions from './actions';

function* renameChat({ 
	payload: {
		newName,
		chatId,
	}
}) {
	try {
		const response = yield call(api.put, {
			url: urls.chatListApi,
			headers: {
        Authorization: getAuthToken(),
			},
			body: {
				chatId,
				name: newName
			}
		});
		console.log(chatId, newName)
		const { ok, error} = response;

		if (ok) {
			yield put(actions.renameChatSuccess({ newName, chatId }))
		} else {
			throw new Error(error)
		}
	} catch (err) {
		yield put(actions.renameChatFail({ errorMessage: err.message }));
	}
}

function* watchRenameChat() {
	yield takeLatest(AT.RENAME_CHAT, renameChat)
}

const renameChatSaga = [
	watchRenameChat,
]

export default renameChatSaga;
