const Chat = require('../models/chat');

const utils = require('../utils/utils');

exports.chatCreate = (req, res, next) => {
  const createdChat = new Chat({
    name: req.body.name,
    messages: req.body.messages,
  });

  createdChat.save((err) => {
      if (err) return next(err);
      
      utils.generateResponse({ res });
  })
};

exports.getAllChats = (req, res, next) => {
  Chat.find((err, result) => {
    if (err) return next(err);

    utils.generateResponse({
      res,
      results: result,
    });
  });
};

exports.getChatById = (req, res, next) => {
  Chat.findById(req.params.id, (err, result) => {
    if (err) return next(err);
    
    utils.generateResponse({
      res,
      results: result,
    });
  });
};

exports.editChatInfo = (req, res, next) => {
  Chat.findByIdAndUpdate(req.params.id, {$set: req.body}, (err, result) => {
    if (err) return next(err);

    utils.generateResponse({
      res,
      results: result,
    });
  });
};

exports.deleteChat = (req, res, next) => {
  Chat.findByIdAndRemove(req.params.id, (err) => {
    if (err) return next(err);
    
    utils.generateResponse({ res });
  })
}
