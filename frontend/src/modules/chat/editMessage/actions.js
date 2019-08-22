import * as AT from './action-types'

export const focusOnForm = () => ({
	type: AT.FOCUS_ON_FORM,
});

export const cancelEditMessage = () => ({
	type: AT.CANCEL_EDIT_MESSAGE,
})

export const editMessage= ({ chatId, messageId, text }) => ({
	type: AT.EDIT_MESSAGE,
	payload: {
		chatId,
		messageId,
		text,
	}
});

export const editMessageSuccess = ({ chatId, messageId, text }) => ({
	type: AT.EDIT_MESSAGE_SUCCESS,
	payload: {
		chatId,
		messageId,
		text,
	},
});

export const editMessageFail = ({ errorMessage }) => ({
	type: AT.EDIT_MESSAGE_FAIL,
	payload: {
		errorMessage,
	},
});