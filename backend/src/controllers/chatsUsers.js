import db from '../models';
import { connection } from '../setup/mongo-connection';
import { getChatsWithAuthors } from '../helpers/getChatsWithAuthors';
import * as utils from '../utils/utils';

export const inviteUsersToChat = async (req, res, next) => {
  try {
    const {
      userIds,
      chatId,
    } = req.body;

    const {
      chatList,
    } = req.decoded;

    const chat = await db.Chat.findOne({
      _id: chatId,
    });

    if (!chat) {
      throw new Error(`Chat with id = ${chatId} not found`);
    }
  
    // if user does not have this chat in chatList - error
    if (!chatList || !chatList.some(userChat => `${userChat._id}` === chat.id)) {
      throw new Error('Current user does not belong to this chat');
    };

    const errorArray = [];

    for (let i = 0; i < userIds.length; i++) {
      const userId = userIds[i];

      const user = await db.User.findOne({
        _id: userId,
      });

      if (!user) {
        errorArray.push(`User with id = ${userId} not found`);
        continue;
      }

      const session = await connection.startSession();
      session.startTransaction();

      try {
        chat.userList = chat.userList.concat(user._id);
        user.chatList = user.chatList.concat(chat._id);

        await chat.save();
        await user.save();
  
        await session.commitTransaction();
      } catch (err) {
        console.error('Transaction aborted: ', err);
        await session.abortTransaction();
      }
    }
    
    if (errorArray.length) {
      throw new Error(errorArray.join(', '));
    }

    utils.generateResponse({
      res,
    });
  } catch (err) {
    next(err);
  }
};


export const findAllUsersNotPresentedInChat = async (req, res, next) => {
  try {
    const {
      chatId,
    } = req.body;

    // find all users which are not in this chat
    const items = await db.User.find({
      chatList: {
        $nin: [chatId],
      },
    })
      .select('_id name email');

    return utils.generateResponse({
      res,
      items,
    });
  } catch (err) {
    next(err);
  }
};
