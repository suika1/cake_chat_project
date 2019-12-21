import lodash from 'lodash';

const AUTH_TOKEN_NAME = 'auth_token';
const USER_NAME = 'user_name';
const USER_EMAIL = 'user_email';
const USER_ID = 'user_id'

export const getAuthToken = () => localStorage.getItem(AUTH_TOKEN_NAME);
export const setAuthToken = (value) => localStorage.setItem(AUTH_TOKEN_NAME, value);

/**
 * returns: {
 *  user_name,
 *  user_email,
 *  user_id,
 * }
 */
export const getUserInfo = () => {
  const info = lodash.pick(
    localStorage,
    ['user_name', 'user_email', 'user_id'],
  );

  return info;
};

export const setUserInfo = ({ name, email, _id } = {}) => {
  localStorage.setItem(USER_NAME, name);
  localStorage.setItem(USER_EMAIL, email);
  localStorage.setItem(USER_ID, _id);
}

export const logoutUser = () => {
  localStorage.removeItem(USER_NAME);
  localStorage.removeItem(USER_EMAIL);
  localStorage.removeItem(USER_ID);
  localStorage.removeItem(AUTH_TOKEN_NAME);
};

export const getName = () => localStorage.getItem(USER_NAME);
export const getEmail = () => localStorage.getItem(USER_EMAIL);
export const getId = () => localStorage.getItem(USER_ID);
