import { ChatModel as Chat } from '../models/chat';
import { UserModel as User } from '../models/user';

import * as utils from '../utils/utils';

export const chatCreate = async (req, res, next) => {
  try {
    const {
      name,
    } = req.body;

    const {
      email
    } = req.decoded;

    const users = await User.find({ email });
    const foundUser = users[0];
    const {
      _id: authorId,
    } = foundUser;

    const createdChat = new Chat({
      name,
      authorId,
      userList: [authorId],
    });

    createdChat.save((err) => {
        if (err) return next(err);
    });

    foundUser.chatList = foundUser.chatList.concat(createdChat._id);

    foundUser.save((err) => {
      if (err) return next(err);
      
      utils.generateResponse({
        res,
        createdChat,
      });
    });
  } catch (err) {
    next(err);
  }
};

// TODO: return only chats in which current user participate
export const getAllChats = async (req, res, next) => {
  Chat.find((err, result) => {
    if (err) return next(err);

    return utils.generateResponse({
      res,
      results: result,
    });
  });
};

export const getChatById = async (req, res, next) => {
  try {
    const result = await Chat.findById(req.params.id);
    return utils.generateResponse({
      res,
      results: result,
    });
  } catch (err) {
    next(err);
  }
};

export const editChatInfo = async (req, res, next) => {
  try {
    const { chatId } = req.body;
    const setVariables = {};
    Object.entries(req.body)
      .filter(([name]) => name !== 'chatId')
      .forEach(([name, val]) => setVariables[name] = val);

    const result = await Chat.findByIdAndUpdate(chatId, {$set: setVariables});

    return utils.generateResponse({
      res,
      results: {
        ...result._doc,
        name: setVariables.name,
      },
    });
  } catch (err) {
    return next(err);
  }
};

// TOOD: delete only if author tries to delete
export const deleteChat = async (req, res, next) => {
  try {
    const { chatId } = req.body;

    const foundChat = await Chat.findOne({ _id: chatId });

    await foundChat.remove();
    return utils.generateResponse({ res });
  } catch (err) {
    next(err);
  }
}
