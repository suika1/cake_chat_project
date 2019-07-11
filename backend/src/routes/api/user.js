import express from 'express';

import * as UserController from '../../controllers/user';
import middlewares from '../../middlewares';

const router = express.Router();

// CREATE
router.post('/', UserController.createUser);

// Validate
router.post('/login/', UserController.loginUser);

// Get user info
router.post('/validate/', middlewares.checkToken, UserController.validateUser);

export default router;
