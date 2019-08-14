import { put, call, takeLatest} from 'redux-saga/effects';

import * as AT from './action-types';
import * as actions from './actions';

import * as api from 'api';
import * as urls from 'api/urls';
import { getAuthToken } from 'api/localStorage';

function* getMessages({
	payload: {
		chatId,
	},
}) {
	try {
		const {
			results,
			ok,
			error
		} = yield call(api.get, { 
			url: `${urls.chatListApi}`,
			headers: {
				Authorization: getAuthToken()
			}
		});
		// const {
		// 	results: {
		// 		messages,
		// 	},
		// 	ok,
		// 	error
		// } = yield call(api.get, { 
		// 	url: `${urls.chatListApi}${chatId}`,
		// 	headers: {
		// 		Authorization: getAuthToken()
		// 	}
		// });

		if (ok) {
			yield put(actions.getMessagesSuccess({ results: results[1].messages }));
			// yield put(actions.getMessagesSuccess({ results: messages }));
		} else {
			throw new Error(error)
		}
	} catch (err) {
		yield put(actions.getMessagesFailed({ errorMessage: err.message }));
	}
}

function* editChat() {
	try {
		yield put(actions.editChatSuccess());
	} catch (err) {
		yield put(actions.editChatFailed())
	}
}

function* watchGetMessages() {
	yield takeLatest(AT.GET_MESSAGES, getMessages);
}

function* watchEditChat() {
	yield takeLatest(AT.EDIT_CHAT, editChat);
}


const ChatSagas = [
	watchGetMessages,
	watchEditChat,
];

export default ChatSagas;
