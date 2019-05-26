import { Schema, model } from 'mongoose';

export const MessageSchema = new Schema({
  author: { type: String, required: true, max: 50 },
  sendTime: { type: Date, default: Date.now },
  text: { type: String, required: true, max: 300 },
});

export const MessageModel = model('Message', MessageSchema);
