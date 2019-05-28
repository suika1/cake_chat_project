import express from 'express';

import * as UserController from '../../controllers/user';

const router = express.Router();

// CREATE
/**
 * @swagger
 *
 * /:
 *   post:
 *     description: Create User
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: username
 *         description: Username to use for login.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: password
 *         description: User's password.
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: login
 */
router.post('/', UserController.createUser);

// Validate
router.post('/validate/', UserController.validateUser);

export default router;
