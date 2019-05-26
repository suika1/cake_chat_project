import { Schema, model } from 'mongoose';

import { MessageSchema } from './message';

export const ChatSchema = new Schema({
  name: { type: String, required: true, max: 50 },
  messages: [MessageSchema],
});

export const ChatModel = model('Chat', ChatSchema);
