import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import User from '../models/user';
import * as utils from '../utils/utils';
import tokenSecret from '../config/token-secret';

export const createUser = async (req, res, next) => {
  try {
    const {
      email,
      name,
      password,
    } = req.body;

    // check if exists
    const foundDocs = await User.find({ email });
    if (foundDocs && foundDocs.length) {
      return utils.generateResponse({
        res,
        status: 400,
        ok: false,
        error: 'user already exists',
      });
    }

    const saltRounds = Math.ceil(Math.random() * 10);
    const hash = await bcrypt.hash(password, saltRounds);

    const token = jwt.sign(
      { email },
      tokenSecret,
      { expiresIn: '24h' }, // expires in 24 hours
    );
    const createdUser = new User({
      name,
      email,
      password: hash,
      chatList: [],
    });
    await createdUser.save();
    return utils.generateResponse({ res, results: createdUser, token });
  } catch (err) {
    next(err);
  }
};

export const validateUser = async (req, res, next) => {
  try {
    const {
      email,
      password,
    } = req.body;

    const foundUsers = await User.find({ email });
    if (!foundUsers || !foundUsers.length) return utils.generateResponse({
      res,
      status: 400,
      error: 'User not found',
    });

    // compare real password hash with received password
    const result = await bcrypt.compare(password, foundUsers[0].password);
    if (!result) return utils.generateResponse({
      res,
      status: 400,
      error: 'Wrong password',
    });

    const token = jwt.sign(
      { email },
      tokenSecret,
      { expiresIn: '24h' }, // expires in 24 hours
    );

    return utils.generateResponse({
      res,
      token,
    });
  } catch (err) {
    next(err);
  }
}
