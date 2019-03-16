const { ChatNotFoundException } = require('../../exceptions/exceptions');
const express = require('express');
const router = express.Router();
const api = require('../../temporary-store/chats');
const { generateResponse } = require('../../utils/utils');

// Get all chats
router.get('/', (req, res) => {
  console.log('Get all chats');

  return generateResponse({
    res,
    results: api.getChatList(),
  });
});

// Get chat by ID
router.get('/:chatId?', (req, res) => {
  console.log('Get chat by ID');

  const chatId = req.params.chatId;
  const foundChat = api.getChat(chatId);

  return generateResponse({
    res,
    results: foundChat,
  });
});

// Add new chat
router.post('/', (req, res) => {
  console.log('Add new chat');

  const { name } = req.body;
  const returnValue = api.addChat(name);

  return generateResponse({
    res,
    results: returnValue,
  });
});

// Add new message
router.post('/:chatId', (req, res) => {
  console.log('Add new message');

  const chatId = req.params.chatId;
  api.addMessage(chatId, req.body);

  return generateResponse({
    res,
    results: api.getChat(chatId).messages,
  });
});

// Edit chat info
router.put('/', (req, res) => {
  console.log('Edit chat info');
  const { chatId, prop, value } = req.body;

  api.updateChatProperty(chatId, prop, value);
  return generateResponse({
    res,
    results: api.getChat(chatId),
  });
});

module.exports = router;
exports.generateResponse = generateResponse;
