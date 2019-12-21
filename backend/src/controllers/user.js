import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';

import { UserModel as User } from '../models/user';
import * as utils from '../utils/utils';

config();
const tokenSecret = process.env.TOKEN_SECRET;

export const createUser = async (req, res, next) => {
  try {
    const {
      email,
      name,
      password,
    } = req.body;
    if (!email || !name || !password) throw new Error('Bad arguments');

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

export const loginUser = async (req, res, next) => {
  try {
    const {
      email,
      password,
    } = req.body;

    const foundUser = await User.findOne({ email });
    if (!foundUser) return utils.generateResponse({
      res,
      status: 400,
      error: {
        message: 'Incorrect email',
        field: 'email',
      },
    });

    // compare real password hash with received password
    const result = await bcrypt.compare(password, foundUser.password);
    if (!result) return utils.generateResponse({
      res,
      status: 400,
      error: {
        message: 'Incorrect password',
        field: 'password',
      },
    });

    const token = jwt.sign(
      { email },
      tokenSecret,
      { expiresIn: '24h' }, // expires in 24 hours
    );

    return utils.generateResponse({
      res,
      results: foundUser,
      token,
    });
  } catch (err) {
    next(err);
  }
};

export const validateUser = async (req, res, next) => {
  try {
    const {
      email,
    } = req.decoded;

    const foundUser = await User.findOne({ email });
    if (!foundUser) return utils.generateResponse({
      res,
      status: 400,
      error: 'User not found',
    });

    const token = jwt.sign(
      { email },
      tokenSecret,
      { expiresIn: '24h' },
    );

    return utils.generateResponse({
      res,
      results: foundUser,
      token,
    });
  } catch (err) {
    next(err);
  }
};
