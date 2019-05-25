import express from 'express';

import * as UserController from '../../controllers/user';

const router = express.Router();

// CREATE
router.post('/', UserController.createUser);

// Validate
router.post('/validate/', UserController.validateUser);

export default router;
