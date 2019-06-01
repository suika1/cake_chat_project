import { Schema, model } from 'mongoose';
import lodash from 'lodash';

import { MessageSchema } from './message';
import { UserModel } from './user';

export const ChatSchema = new Schema({
  name: { type: String, required: true, max: 50 },
  messages: [MessageSchema],
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

export const ChatModel = model('Chat', ChatSchema);
