export const base = `http://localhost:${process.env.PORT || 5000}/`;

export const chat = `${base}:chatId/`;

export const api = `${base}api/v1/`;

export const chatListApi = `${api}chat-list/`;
export const messageListApi = `${api}message-list/`;
export const userListApi = `${api}users/`;

export const validate = `${userListApi}validate/`
