import moment from 'moment';

import { ChatModel as Chat } from '../models/chat';

export let WebSocket;

export const initializeWebscoketServer = () => {
  const PORT = 5678;
  const ws = require('ws');

  const wss = new ws.Server({ port: PORT });

  wss.on('connection', ws => {
    WebSocket = ws;

    ws.on('message', async message => {
      try {
        const json = JSON.parse(message);

        const { messages } = await Chat.findById(json.chatId);

        const newMessages = messages.filter(msg => {
          return moment(msg.sendTime) > moment(json.lastMsgTime);
        });

        ws.send(JSON.stringify(newMessages));
      } catch (err) {
        console.error('WS error: ', err.message);
        ws.send('JSON, please!');
      }
    });

    ws.on('error', err => console.log('err', err));
  });
};
