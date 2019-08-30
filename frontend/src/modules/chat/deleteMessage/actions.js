import * as AT from './action-types'

export const  deleteMessage= ({ chatId, selectedMessages }) => ({
	type: AT.DELETE_MESSAGE,
	payload: {
		chatId,
		selectedMessages,
	}
});

export const deleteMessageSuccess = ({ chatId, deletedMessagesIDs }) => ({
	type: AT.DELETE_MESSAGE_SUCCESS,
	payload: {
		chatId,
		deletedMessagesIDs,
	},
});

export const deleteMessageFail = ({ errorMessage }) => ({
	type: AT.DELETE_MESSAGE_FAIL,
	payload: {
		errorMessage,
	},
});