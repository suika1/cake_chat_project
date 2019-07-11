import { Schema, model } from 'mongoose';
import { UserModel } from './user';

export const MessageSchema = new Schema({
  authorId: { type: Schema.Types.ObjectId, ref: UserModel },
  sendTime: { type: Date, default: Date.now },
  text: { type: String, required: true, max: 300 },
});

export const MessageModel = model('Message', MessageSchema);
