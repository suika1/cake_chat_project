import moment from 'moment';

import { ChatModel as Chat } from '../models/chat';

export let WebSocket;

const noop = () => {};

export let connectedUsers = [];

export let notifyAboutChatChanges = ({
  chatId,
  createdMessages,
  deletedMessages,
}) => {
  connectedUsers.forEach(user => {
    const filterCreatedNotByCurrentUser = msg => msg.authorId.toString() !== user.id;

    if (user.chatId === chatId) {
      const filteredCreatedMessages = createdMessages.filter(filterCreatedNotByCurrentUser);
      const filteredDeletedMessages = deletedMessages.filter(filterCreatedNotByCurrentUser);
      if (filteredDeletedMessages.length || filteredCreatedMessages.length) {
        console.log('Sending message changes to user: ', user.id);
        user.ws.send(JSON.stringify({
          createdMessages: filteredCreatedMessages,
          deletedMessages: filteredDeletedMessages,
        }));
      }
    }
  })
};

export const initializeWebscoketServer = () => {
  const PORT = 5678;
  const ws = require('ws');

  const wss = new ws.Server({
    port: PORT,
    clientTracking: true,
  });

  const findUserById = userId => connectedUsers.find(user => user.id === userId);
  const addNewUser = user => {
    connectedUsers = connectedUsers
      .concat(user)
  };

  const deleteUser = userId => {
    connectedUsers = connectedUsers.filter(otherUser => userId !== otherUser.id);
  }

  const updateUser = user => {
    connectedUsers = connectedUsers.map(otherUser => {
      if (user.id !== otherUser.id) return otherUser;
      return {
        ...otherUser,
        ...user,
      };
    });
  }

  wss.on('connection', ws => {
    let userId = null;
    ws.isAlive = true;

    ws.on('pong', () => ws.isAlive = true);

    ws.on('message', async message => {
      try {
        const json = JSON.parse(message);
        console.log('received msg: ', json);

        if (!json || !json.chatId || !json.userId) {
          throw new Error('Wrong message!');
        }

        userId = json.userId;

        if (!findUserById(json.userId)) {
          addNewUser({
            id: json.userId,
            ws,
            chatId: json.chatId,
          });
        } else {
          updateUser({
            id: json.userId,
            chatId: json.chatId,
          });
        }
      } catch (err) {
        console.error('WS error: ', err.message);
        ws.send(err.message);
      }
    });

    ws.on('error', err => console.log('Websocket error: \n', err));
    ws.on('close', () => deleteUser(userId));
  });

  // periodically ping all clients and delete dead connections
  setInterval(() => {
    wss.clients.forEach(ws => {
      if (ws.isAlive === false) {
        return ws.terminate();
      }
    
      ws.isAlive = false;
      ws.ping(noop);
    });
  }, 30000);
};
