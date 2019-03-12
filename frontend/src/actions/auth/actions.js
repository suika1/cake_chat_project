import * as AT from './action-types';

export const authSignedIn = user => {
  return {
    type: AT.AUTH_SIGNED_IN,
    user: user,
  };
};

export const authSignedOut = () => {
  return {
    type: AT.AUTH_SIGNED_OUT,
  };
};

export default {
  authSignedIn,
  authSignedOut,
};
