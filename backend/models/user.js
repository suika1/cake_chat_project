import { Schema, model } from 'mongoose';

import { ChatSchema } from './chat';

const UserSchema = new Schema({
  name: { type: String, required: true, max: 50 },
  email: { type: String, required: true, max: 50 },
  password: { type: String, required: true },
  chatList: [ChatSchema],
});

export default model('User', UserSchema);
