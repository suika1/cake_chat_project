import {put, call, takeLatest} from 'redux-saga/effects';

import * as api from 'api';
import * as urls from 'api/urls';
import { getAuthToken } from 'api/localStorage'

import * as AT from './action-types';
import * as actions from './actions';

function* deleteMessage({ 
	payload: {
		chatId,
		selectedMessages,
	}
}) {
	const deletedMessagesIDs = [];

	for (let i=0; i<selectedMessages.length; i++) {
		try {
			const response = yield call(api.deleteRequest, {
				url: urls.messageListApi,
	
				headers: {
					Authorization: getAuthToken(),
				},
	
				body: {
					chatId,
					messageId: selectedMessages[i].messageId
				}
			});
	
			const { ok, error } = response;
	
			if (ok) {
				yield deletedMessagesIDs.push(selectedMessages[i].messageId)
				//yield put(actions.deleteMessageSuccess({ chatId }))
			} else {
				throw new Error(error)
			}
		} catch (err) {
			yield put(actions.deleteMessageFail({ errorMessage: err.message }));
		}
	}

	if (deletedMessagesIDs.length) yield put(actions.deleteMessageSuccess({ chatId, deletedMessagesIDs}))
}

function* watchDeleteMessage() {
	yield takeLatest(AT.DELETE_MESSAGE, deleteMessage)
}

const deleteMessageSagas = [
	watchDeleteMessage,
]

export default deleteMessageSagas;
