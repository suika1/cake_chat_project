import * as AT from './action-types';

const initialState = {
	isFetching: false,
};

export default (state = initialState, action) => {
	switch (action.type) {
		case AT.DELETE_CHAT:
			return {
				...state,
				isFetching: true,
			};
		case AT.DELETE_CHAT_SUCCESS:
			return {
				...state,
				isFetching: false,
			}
		case AT.DELETE_CHAT_FAIL:
			return {
				...state,
				isFetching: false,
			}
		default:
			return state;
	}
}
