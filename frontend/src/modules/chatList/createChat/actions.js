import * as AT from './action-types'

export const createChat = ({ chatName }) => ({
	type: AT.CREATE_CHAT,
	payload: {
		chatName,
	}
});

export const createChatSuccess = ({ createdChat }) => ({
	type: AT.CREATE_CHAT_SUCCESS,
	payload: {
		createdChat,
	},
});

export const createChatFail = ({ errorMessage }) => ({
	type: AT.CREATE_CHAT_FAIL,
	payload: {
		errorMessage,
	},
});