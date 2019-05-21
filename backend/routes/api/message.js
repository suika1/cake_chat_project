const express = require('express');
const router = express.Router();

const MessageController = require('../../controllers/message');

// CREATE
router.post('/', MessageController.createMessage);

// READ
router.get('/', MessageController.getMessage);

// UPDATE
router.put('/', MessageController.updateMessage);

// DELETE
router.delete('/', MessageController.deleteMessage);

module.exports = router;
