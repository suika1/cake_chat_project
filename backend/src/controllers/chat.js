import { ChatModel as Chat } from '../models/chat';
import { UserModel as User } from '../models/user';

import { getChatsWithAuthors } from '../helpers/getChatsWithAuthors';
import * as utils from '../utils/utils';

export const chatCreate = async (req, res, next) => {
  try {
    const {
      name,
    } = req.body;

    const {
      email,
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

export const getAllChats = async (req, res, next) => {
  try {
    const chatList = await getChatsWithAuthors({
      email: req.decoded.email,
    });

    return utils.generateResponse({
      res,
      results: chatList,
    });
  } catch (err) {
    return next(err);
  }
};

export const getChatById = async (req, res, next) => {
  try {
    const chat = await getChatsWithAuthors({
      chatId: req.params.id,
      email: req.decoded.email,
    });

    return utils.generateResponse({
      res,
      results: chat,
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

    const result = await Chat.findByIdAndUpdate(chatId, { $set: setVariables });

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
