import { Schema, model } from 'mongoose';
import lodash from 'lodash';

import { MessageSchema } from './message';
import { notifyAboutChatChanges } from 'src/setup/websocket-server';
import { UserModel } from './user';
import { addAuthorsToMessages } from '../helpers/addAuthorsToMessages';

export const ChatSchema = new Schema({
  name: { type: String, required: true, max: 50 },
  messages: [MessageSchema],
  authorId: { type: Schema.Types.ObjectId, ref: UserModel },
  userList: [{ type: Schema.Types.ObjectId, ref: UserModel }],
});

/**
 * Post remove hook
 * - Removes this chat id from user chatList array
 */
ChatSchema.post('remove', (doc) => {
  try {
    doc.userList.forEach(async userId => {
      const foundUser = await UserModel.findOne({ _id: userId });

      foundUser.chatList = foundUser.chatList.filter(docId => !lodash.isEqual(docId, doc._id));

      await foundUser.save();
    })
  } catch (err) {
    console.error('Error in remove hook of ChatSchema: ', err.message);
    console.log(err.stack);
  }
});

ChatSchema.pre('save', async function(next) {
  try {
    const prevChat = await ChatModel.findOne({ _id: this._id });
    const currentChat = this;

    const createdMessagesIds = lodash.difference(
      currentChat.messages.map(a => a.id),
      prevChat.messages.map(a => a.id),
    );
    const deletedMessagesIds = lodash.difference(
      prevChat.messages.map(a => a.id),
      currentChat.messages.map(a => a.id),
    );

    const createdMessages = await addAuthorsToMessages(
      currentChat.messages
        .filter(msg => createdMessagesIds.includes(msg.id))
    );
    const deletedMessages = await addAuthorsToMessages(
      prevChat.messages
        .filter(msg => deletedMessagesIds.includes(msg.id))
    );

    notifyAboutChatChanges({
      chatId: currentChat.id,
      createdMessages,
      deletedMessages,
    })
    next();
  } catch (err) {
    console.error(err);
  }
})

export const ChatModel = model('Chat', ChatSchema);
