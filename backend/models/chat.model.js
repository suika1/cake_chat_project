const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = require('./message.model').schema;
// console.log(MessageSchema);

const ChatSchema = new Schema({
  name: { type: String, required: true, max: 50 },
  messages: [MessageSchema],
});

module.exports = mongoose.model('Chat', ChatSchema);