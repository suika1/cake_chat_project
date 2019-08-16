import * as AT from './action-types'

export const renameChat = ({ newName, chatId }) => ({
	type: AT.RENAME_CHAT,
	payload: {
		newName,
		chatId,
	}
});

export const renameChatSuccess = ({ newName, chatId }) => ({
	type: AT.RENAME_CHAT_SUCCESS,
	payload: {
		newName,
		chatId,
	},
});

export const renameChatFail = ({ errorMessage }) => ({
	type: AT.RENAME_CHAT_FAIL,
	payload: {
		errorMessage,
	},
});