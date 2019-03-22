const { ChatNotFoundException } = require('../../exceptions/exceptions');
const express = require('express');
const router = express.Router();
const api = require('../../temporary-store/chats');
const { generateResponse } = require('../../utils/utils');

// CREATE

// -- Chats

// --|-- add new chat
router.post('/', (req, res) => {
  console.log('Add new chat');

  const { name } = req.body;

  return generateResponse({
    res,
    results: api.addChat({ name }),
  });
});

// -- Messages

// --|-- Add new message
router.post('/:chatId', (req, res) => {
  console.log('Add new message');

  const chatId = req.params.chatId;

  const { text, author } = req.body;
  api.addMessage({
    chatId,
    text,
    author,
  });

  return generateResponse({
    res,
    results: api.getChat({ chatId }).messages,
  });
});

// READ

// -- Chats

// --|-- Get all chats
router.get('/', (req, res) => {
  console.log('Get all chats');

  return generateResponse({
    res,
    results: api.getChatList(),
  });
});

// --|-- Get chat by ID
router.get('/:chatId?', (req, res) => {
  console.log('Get chat by ID');

  const chatId = req.params.chatId;
  const foundChat = api.getChat({ chatId });

  return generateResponse({
    res,
    results: foundChat,
  });
});

// -- Messages

// UPDATE

// -- Chats

// --|-- Edit chat info
router.put('/', (req, res) => {
  console.log('Edit chat info');
  const { chatId, prop, value } = req.body;

  api.updateChatProperty({ chatId, prop, value });
  return generateResponse({
    res,
    results: api.getChat({ chatId }),
  });
});

// -- Messages

// --|-- Edit message
router.put('/:chatId', (req, res) => {
  console.log('Edit message');

  const chatId = req.params.chatId;
  
  const {
    text: newText,
    id: messageId,
  } = req.body;
  
  api.updateMessage({
    chatId,
    messageId,
    newText,
  });

  return generateResponse({
    res,
    results: api.getChat({ chatId }).messages,
  });
});

// DELETE

// -- Chats

// --|-- Remove chat
router.delete('/', (req, res) => {
  console.log('Delete chat');

  const { id: chatId } = req.body;

  api.removeChat({ chatId });

  return generateResponse({
    res,
    results: api.getChatList(),
  })
})

// -- Messages

// --|-- Delete message
router.delete('/:chatId', (req, res) => {
  console.log('Delete message');

  const chatId = req.params.chatId;
  
  const {
    id: messageId,
  } = req.body;
  
  api.removeMessage({
    chatId,
    messageId,
  });

  return generateResponse({
    res,
    results: api.getChat({ chatId }).messages,
  });
});

module.exports = router;
exports.generateResponse = generateResponse;
