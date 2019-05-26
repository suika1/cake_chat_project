import { Schema, model } from 'mongoose';

import { ChatSchema } from './chat';

const UserSchema = new Schema({
  email: { type: String, required: true, max: 50, unique: true },
  name: { type: String, required: true, max: 50 },
  password: { type: String, required: true },
  chatList: [ChatSchema],
});

export default model('User', UserSchema);
