import { MessageModel as Message } from '../models/message';
import { ChatModel as Chat } from '../models/chat';

import { MessageNotFoundException } from '../exceptions/exceptions';

import * as utils from '../utils/utils';

export const createMessage = async (req, res, next) => {
  try {
    const {
      author,
      text,
      chatId,
    } = req.body;

    const createdMessage = new Message({
      author,
      sendTime: Date.now(),
      text,
    });
  
    const chat = await Chat.findById(chatId);
    chat.messages.push(createdMessage);
    await chat.save();
    utils.generateResponse({ res });
  } catch (err) {
    next(err);
  }
};

export const getMessage = async (req, res, next) => {
  try {
    const {
      chatId,
      messageId,
    } = req.body;

    const chat = await Chat.findById(chatId);
    const message = chat.messages.find(msg => msg._id.toString() === messageId.toString());
    if (!chat || !message) {
      throw new MessageNotFoundException(chatId, messageId);
    } else {
      utils.generateResponse({
        res,
        results: message,
      });
    }
  } catch (err) {
    next(err);
  }
};

export const updateMessage = async (req, res, next) => {
  try {
    const {
      chatId,
      messageId,
      text,
    } = req.body;

    const chat = await Chat.findById(chatId);
    if (!chat || !chat.messages.find(msg => msg._id.toString() === messageId.toString())) {
      throw new MessageNotFoundException(chatId, messageId);
    }

    chat.messages = chat.messages.map(msg => {
      return msg._id.toString() !== messageId.toString() ? msg : (() => {
          const newMsg = msg;
          newMsg.text = text;
          return newMsg;
        })();
    });

    chat.save();
    utils.generateResponse({ res });
  } catch (err) {
    next(err);
  }
};

export const deleteMessage = async (req, res, next) => {
  try {
    const {
      chatId,
      messageId,
    } = req.body;

    const chat = await Chat.findById(chatId);
    const filteredMessages = chat.messages
      .filter(msg => msg._id.toString() !== messageId.toString());
    if (!chat || filteredMessages.length === chat.messages.length) {
      throw new MessageNotFoundException(chatId, messageId);
    }
    
    chat.messages = filteredMessages;
    
    chat.save();
    utils.generateResponse({ res });
  } catch (err) {
    next(err);
  }
};
