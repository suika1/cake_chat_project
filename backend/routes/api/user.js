const express = require('express');
const router = express.Router();

const UserController = require('../../controllers/user');

// CREATE
router.post('/', UserController.createUser);

module.exports = router;
