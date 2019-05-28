import express from 'express';
const router = express.Router();

import * as ChatController from '../../controllers/chat'; 

// CREATE
router.post('/', ChatController.chatCreate);

// READ
/**
 * @swagger
 *
 * /:
 *   get:
 *     description: Get all chats
 *     parameters:
 *       - name2: username2
 *         description: Username to use for login.
 *         in: formData
 *         required: true
 *         type: string
 *       - name2: password2
 *         description: User's password.
 *         in: formData
 *         required: true
 *         type: string
 *     responses2:
 *       200:
 *         description: login
 */
router.get('/', ChatController.getAllChats);

router.get('/:id?', ChatController.getChatById);

// UPDATE
router.put('/:id?', ChatController.editChatInfo);

// DELETE
router.delete('/:id?', ChatController.deleteChat);

export default router;
