// TODO: rework with database

const {
  ChatNotFoundException,
  BadFieldsException,
  ChatAlreadyExistsException,
} = require('../exceptions/exceptions');
const moment = require('moment');
const uuid = require('uuid/v4');
const lodash = require('lodash');

const chatStore = [
  {
    id: '1',
    chatName: 'My chat',
    // TODO: add users maybe
    messages: [
      {
        id: '1',
        author: 'My_user',
        sendTime: moment()
          .subtract(30, 'minutes')
          .format('DD-MM-YYYY HH-mm'),
        content: 'Hello there, boys',
      },
      {
        id: '2',
        author: 'Another_user',
        sendTime: moment()
          .subtract(10, 'minutes')
          .format('DD-MM-YYYY HH-mm'),
        content: 'No, you, leatherman',
      },
    ],
  },
  {
    id: '2',
    chatName: 'My chat number 2',
    // TODO: add users maybe
    messages: [
      {
        id: '1',
        author: 'Another_user',
        sendTime: moment()
          .subtract(1.5, 'hours')
          .format('DD-MM-YYYY HH-mm'),
        content: 'Hehehe',
      },
      {
        id: '2',
        author: 'User_3',
        sendTime: moment()
          .subtract(5, 'minutes')
          .format('DD-MM-YYYY HH-mm'),
        content: 'Chat created!',
      },
    ],
  },
];

// Requests

const getChatList = () => [...chatStore];

const getChat = chatId => {
  const res = chatStore.find(chat => chat.id === chatId);
  if (!res) throw new ChatNotFoundException(chatId);
  return res;
};

// Mutations

const addChat = name => {
  if (!name) {
    throw new BadFieldsException('name');
  }
  if (chatStore.find(a => a.chatName === name)) {
    throw new ChatAlreadyExistsException(name);
  }
  const newChat = {
    id: uuid(),
    chatName: name,
    messages: [],
  };

  chatStore.push(newChat);
  return newChat;
};

const updateChatProperty = (chatId, prop, value) => {
  if (!chatId || !prop || !value) {
    const badFields = {};
    [{ chatId }, { prop }, { value }]
      .filter(a => !Object.values(a)[0])
      .forEach(a => Object.assign(badFields, a));
      console.log('BadFields: ', badFields);
    throw new BadFieldsException(...Object.keys(badFields));
  }
  let foundIndex = -1;
  const found = chatStore.find((chat, index) => {
    if (chat.id === chatId) {
      foundIndex = index;
      return true;
    }
    return false;
  });
  if (foundIndex === -1) {
    throw new ChatNotFoundException(chatId);
  }

  chatStore.splice(foundIndex, 1, {
    ...found,
    [prop]: value,
  });
};

const removeChat = chatId => {
  if (!chatStore.find(chat => chat.id === chatId)) {
    throw new ChatNotFoundException(chatId);
  }
  lodash.remove(chat => chat.id === chatId);
};

const addMessage = (chatId, {
  text,
  author,
}) => {
  const found = chatStore.find(chat => chat.id === chatId);
  if (!found) {
    throw new ChatNotFoundException(chatId);
  }
  found.messages.push({
    id: uuid(),
    author,
    sendTime: moment().format('DD-MM-YYYY HH-mm'),
    content: text,
  });
};

module.exports = {
  getChatList,
  getChat,
  addChat,
  updateChatProperty,
  removeChat,
  addMessage,
};
