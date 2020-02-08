import express from 'express';
const router = express.Router();

import * as ChatsUsersController from '../../controllers/chatsUsers'; 

router.post('/invite-users-to-chat/', ChatsUsersController.inviteUsersToChat);
router.post('/find-all-users-not-presented-in-chat/', ChatsUsersController.findAllUsersNotPresentedInChat);

export default router;
