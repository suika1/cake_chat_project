// TODO: rework with database

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
          .format('DD-MM-YYYY'),
        content: 'Hello there, boys',
      },
      {
        id: '2',
        author: 'Another_user',
        sendTime: moment()
          .subtract(10, 'minutes')
          .format('DD-MM-YYYY'),
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
          .format('DD-MM-YYYY'),
        content: 'Hehehe',
      },
      {
        id: '2',
        author: 'User_3',
        sendTime: moment()
          .subtract(5, 'minutes')
          .format('DD-MM-YYYY'),
        content: 'Chat created!',
      },
    ],
  },
];

// Requests

const getChatList = () => [...chatStore];

const getChat = chatId => chatStore.find(chat => chat.id === chatId);

// Mutations

const addChat = name => {
  const newChat = {
    id: uuid(),
    chatName: name,
    messages: [],
  };

  chatStore.push(newChat);
};

const removeChat = chatId => {
  lodash.remove(chat => chat.id === chatId);
};

const addMessage = (chatId, text, author) => {
  chatStore
    .find(chat => chat.id === chatId)
    .messages.push({
      id: uuid(),
      author,
      sendTime: moment().toISOString(),
      content: text,
    });
};

module.exports = {
  getChatList,
  getChat,
  addChat,
  removeChat,
  addMessage,
};
