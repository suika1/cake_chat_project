const AUTH_TOKEN_NAME = 'auth_token';
const USER_NAME = 'user_name';
const USER_EMAIL = 'user_email';
const USER_ID = 'user_id'

export const getAuthToken = () => localStorage.getItem(AUTH_TOKEN_NAME);
export const setAuthToken = (value) => localStorage.setItem(AUTH_TOKEN_NAME, value);

export const getUserInfo = () => {
  const info = { 
    user_name, 
    user_email, 
    user_id 
  } = localStorage;
  
  return info;
};

export const setUserInfo = ({ name, email, _id }) => {
  localStorage.setItem(USER_NAME, name);
  localStorage.setItem(USER_EMAIL, email);
  localStorage.setItem(USER_ID, _id);
}

export const getName = () => localStorage.getItem(USER_NAME);
export const getEmail = () => localStorage.getItem(USER_EMAIL);
export const getId = () => localStorage.getItem(USER_ID);
