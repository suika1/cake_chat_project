import jwt from 'jsonwebtoken';
import { config } from 'dotenv';

import db from '../../models';

import * as utils from '../../utils/utils';

config();
const tokenSecret = process.env.TOKEN_SECRET;

const checkToken = (req, res, next) => {
  try {
    const generateSomethingWentWrong500Response = () => utils.generateResponse({
      res,
      status: 500,
      ok: false,
      error: 'Something went wrong',
    });

    if (req.method === 'OPTIONS') {
      return next();
    }

    let token = req.headers['x-access-token'] || req.headers.authorization;
    if (token && token.length && token.startsWith('Bearer ')) {
      // Remove Bearer from string
      token = token.slice(7, token.length);
    }

    if (token) {
      jwt.verify(token, tokenSecret, async (err, decoded) => {
        try {
          if (err) {
            return utils.generateResponse({
              res,
              status: 401,
              ok: false,
              error: 'Token is not valid',
            });
          }
  
          const currentUser = await db.User.findOne({
            email: decoded.email,
          });
  
          req.decoded = currentUser;
          next();
        } catch (err) {
          console.error(err);
          return generateSomethingWentWrong500Response();
        }
      });
    } else {
      return utils.generateResponse({
        res,
        status: 400,
        ok: false,
        error: 'Auth token is not supplied',
      });
    }
  } catch (err) {
    console.error(err);
    return generateSomethingWentWrong500Response();
  }
};

export default checkToken;
