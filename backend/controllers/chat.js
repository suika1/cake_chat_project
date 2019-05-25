import { ChatModel as Chat } from '../models/chat';

import * as utils from '../utils/utils';

export const chatCreate = (req, res, next) => {
  const createdChat = new Chat({
    name: req.body.name,
    messages: req.body.messages,
  });

  createdChat.save((err) => {
      if (err) return next(err);
      
      utils.generateResponse({ res });
  })
};

export const getAllChats = (req, res, next) => {
  Chat.find((err, result) => {
    if (err) return next(err);

    return utils.generateResponse({
      res,
      results: result,
    });
  });
};

export const getChatById = (req, res, next) => {
  Chat.findById(req.params.id, (err, result) => {
    if (err) return next(err);
    
    return utils.generateResponse({
      res,
      results: result,
    });
  });
};

export const editChatInfo = (req, res, next) => {
  Chat.findByIdAndUpdate(req.params.id, {$set: req.body}, (err, result) => {
    if (err) return next(err);

    return utils.generateResponse({
      res,
      results: result,
    });
  });
};

export const deleteChat = (req, res, next) => {
  Chat.findByIdAndRemove(req.params.id, (err) => {
    if (err) return next(err);
    
    return utils.generateResponse({ res });
  })
}
