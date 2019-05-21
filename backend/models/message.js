const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  author: { type: String, required: true, max: 50 },
  sendTime: { type: Date, default: Date.now },
  text: { type: String, required: true, max: 300 },
});

module.exports = mongoose.model('Message', messageSchema);
