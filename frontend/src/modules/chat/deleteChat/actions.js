import * as AT from './action-types'

export const  deleteChat= ({ chatId }) => ({
	type: AT.DELETE_CHAT,
	payload: {
		chatId,
	}
});

export const deleteChatSuccess = ({ chatId }) => ({
	type: AT.DELETE_CHAT_SUCCESS,
	payload: {
		chatId,
	},
});

export const deleteChatFail = ({ errorMessage }) => ({
	type: AT.DELETE_CHAT_FAIL,
	payload: {
		errorMessage,
	},
});