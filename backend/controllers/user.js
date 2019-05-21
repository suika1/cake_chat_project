const User = require('../models/user');
const Chat = require('../models/chat');

const utils = require('../utils/utils');

exports.createUser = async (req, res, next) => {
  try {
    const {
      email,
      name,
      password,
    } = req.body;
    // check if exists
    const foundDocs = await User.find({ name, email });
    console.log('foundDocs', foundDocs);
    if (foundDocs && foundDocs.length) {
      return utils.generateResponse({
        res,
        ok: false,
        error: 'user already exists',
      });
    }
    const bcrypt = require('bcrypt');
    const saltRounds = 10;

    const hash = await bcrypt.hash(password, saltRounds);
    console.log('hash', hash);

    const createdUser = new User({
      name,
      email,
      password: hash,
      chatList: [],
    });
    // const chat = await Chat.findById(chatId);
    // chat.messages.push(createdMessage);
    console.log('createdUser', createdUser);
    await createdUser.save();
    utils.generateResponse({ res, results: createdUser });
  } catch (err) {
    next(err);
  }
};

