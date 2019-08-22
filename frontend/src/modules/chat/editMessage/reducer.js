import * as AT from './action-types';

const initialState = {
	isFetching: false,
	isEditing: false,
};

export default (state = initialState, action) => {
	switch (action.type) {
		case AT.FOCUS_ON_FORM:
			return {
				...state,
				isEditing: true,
			}
		case AT.CANCEL_EDIT_MESSAGE:
			return {
				...state,
				isEditing: false,
			}
		case AT.EDIT_MESSAGE:
			return {
				...state,
				isFetching: true,
			};
		case AT.EDIT_MESSAGE_SUCCESS:
			return {
				...state,
				isFetching: false,
				isEditing: false,
			}
		case AT.EDIT_MESSAGE_FAIL:
			return {
				...state,
				isFetching: false,
				isEditing: false,
			}
		default:
			return state;
	}
}
