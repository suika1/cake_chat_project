import express from 'express';
const router = express.Router();

import * as MessageController from '../../controllers/message';

// CREATE
router.post('/', MessageController.createMessage);

// READ
router.get('/', MessageController.getMessage);

// UPDATE
router.put('/', MessageController.updateMessage);

// DELETE
router.delete('/', MessageController.deleteMessage);

export default router;
