import { Schema, model } from 'mongoose';

import { ChatModel } from './chat';

export const UserSchema = new Schema({
  email: { type: String, required: true, max: 50, unique: true },
  name: { type: String, required: true, max: 50 },
  password: { type: String, required: true },
  chatList: [{ type: Schema.Types.ObjectId, ref: ChatModel }],
});

export const UserModel = model('User', UserSchema);

