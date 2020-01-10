import { UserModel as User } from '../models/user';

/**
 * Adds authors for each message
 * @param {object[]} messages Array of MessageModel instances
 */
export const addAuthorsToMessages = async (messages) => {
  const msgObjects = messages.map(a => a.toObject());
  for (let i = 0; i < msgObjects.length; i++) {
    const message = msgObjects[i];
    const author = await User
      .findOne({
        _id: message.authorId,
      })
      .select('name email');

    message.author = author;
  }

  return msgObjects;
}
