import { WebSocket } from '../setup/websocket-server';

const SubscribedUserList = [];

/**
 * User example:
 * {
 *  id,
 *  chatId,
 *  lastMsgId,
 *  TODO:
 * }
 */
export const subscribeUserToList = (user) => SubscribedUserList.push(user);
