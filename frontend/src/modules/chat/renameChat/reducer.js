import * as AT from './action-types';

const initialState = {
	isFetching: false,
};

export default (state = initialState, action) => {
	switch (action.type) {
		case AT.RENAME_CHAT:
			return {
				...state,
				isFetching: true,
			};
		case AT.RENAME_CHAT_SUCCESS:
			return {
				...state,
				isFetching: false,
			}
		case AT.RENAME_CHAT_FAIL:
			return {
				...state,
				isFetching: false,
			}
		default:
			return state;
	}
}
