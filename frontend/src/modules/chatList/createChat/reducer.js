import * as AT from './action-types';

const initialState = {
	isFetching: false,
};

export default (state = initialState, action) => {
	switch (action.type) {
		case AT.CREATE_CHAT:
			return {
				...state,
				isFetching: true,
			};
		case AT.CREATE_CHAT_SUCCESS:
			return {
				...state,
				isFetching: false,
			}
		case AT.CREATE_CHAT_FAIL:
			return {
				...state,
				isFetching: false,
			}
		default:
			return state;
	}
}
