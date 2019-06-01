import express from 'express';
const router = express.Router();

import * as ChatController from '../../controllers/chat'; 

// CREATE
router.post('/', ChatController.chatCreate);

// READ
router.get('/', ChatController.getAllChats);

router.get('/:id?', ChatController.getChatById);

// UPDATE
router.put('/', ChatController.editChatInfo);

// DELETE
router.delete('/', ChatController.deleteChat);

export default router;
