import * as AT from './action-types';

const initialState = {
  error: '',
  name: '',
  familyName: '',
  fullName: '',
  imageUrl: '',
  email: '',
};

export default function AuthReducer(state = initialState, action) {
  switch (action.type) {
    case AT.AUTH_SIGNED_IN: {
      let { name, familyName, fullName, imageUrl, email } = action.user;
      return {
        ...state,
        error: '',
        name: name,
        familyName: familyName,
        fullName: fullName,
        imageUrl: imageUrl,
        email: email,
      };
    }
    case AT.AUTH_SIGNED_OUT:
      return { ...initialState, loaded: state.loaded };
    default:
      return state;
  }
}
