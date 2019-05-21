const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChatSchema = require('./chat').schema;

const UserSchema = new Schema({
  name: { type: String, required: true, max: 50 },
  email: { type: String, required: true, max: 50 },
  password: { type: String, required: true },
  chatList: [ChatSchema],
});

module.exports = mongoose.model('User', UserSchema);
