const express = require('express');
const router = express.Router();

const ChatController = require('../../controllers/chat.controller');

// CREATE
router.post('/', ChatController.chatCreate);

// READ
router.get('/', ChatController.getAllChats);

router.get('/:id?', ChatController.getChatById);

// UPDATE
router.put('/:id?', ChatController.editChatInfo);

// DELETE
router.delete('/:id?', ChatController.deleteChat);

module.exports = router;
