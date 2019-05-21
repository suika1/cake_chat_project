const Message = require('../models/message');
const Chat = require('../models/chat');

const { MessageNotFoundException } = require('../exceptions/exceptions');

const utils = require('../utils/utils');

exports.createMessage = async (req, res, next) => {
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

exports.getMessage = async (req, res, next) => {
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

exports.updateMessage = async (req, res, next) => {
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

exports.deleteMessage = async (req, res, next) => {
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
    };
    
    chat.messages = filteredMessages;
    
    chat.save();
    utils.generateResponse({ res });
  } catch (err) {
    next(err);
  }
};
