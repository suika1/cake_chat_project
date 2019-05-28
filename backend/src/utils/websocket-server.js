import moment from 'moment';

import { ChatModel as Chat } from '../models/chat';

const startWebsocketServer = () => {
  const PORT = 5678;
  const WebSocket = require('ws');
  
  const wss = new WebSocket.Server({ port: PORT });
  
  // TODO: logs, errors
  // TODO: Refactor with SocketIO
  wss.on('connection', ws => {
    ws.on('message', async message => {
      try {
        const json = JSON.parse(message);

        const { messages } = await Chat.findById(json.chatId);

        const newMessages = messages.filter(msg => {
          return moment(msg.sendTime) > moment(json.lastMsgTime);
        });
        ws.send(JSON.stringify(newMessages));
      } catch (err) {
        ws.send('JSON, please!');
      }
    });
  
    ws.on('error', err => console.log('err', err));
  });
}

export default startWebsocketServer;
