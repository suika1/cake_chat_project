import { store } from 'store';
import { getMessagesFromWsSuccess } from 'modules/chat/actions';

const PORT = 5678;

const defaultConsoleWarn = () => console.warn('Could\'nt send socket message');

export let sendMessage = defaultConsoleWarn;
export let subscribeToChat = ({
  userId,
  chatId,
}) => defaultConsoleWarn();

export const initializeWebsocketConnection = () => {
  const socket = new WebSocket(`ws://localhost:${PORT}/`);

  socket.onmessage = e => {
    try {
      const json = JSON.parse(e.data);
      if (json) {
        if ((
          json.createdMessages
          && json.createdMessages.length
        ) || (
          json.deletedMessages
          && json.deletedMessages.length
        )) {
          store.dispatch(getMessagesFromWsSuccess({
            createdMessages: json.createdMessages,
            deletedMessages: json.deletedMessages,
          }));
        }
      }
    } catch (err) {
      console.warn(err);
    }
  };
  socket.onerror = e => console.error('Error in websockets: ', e.message);

  sendMessage = msg => {
    const json = JSON.stringify(msg);
    socket.send(json);
  };

  subscribeToChat = ({
    userId,
    chatId,
  }) => {
    const json = JSON.stringify({
      userId,
      chatId,
    });

    socket.send(json);
  }
};
