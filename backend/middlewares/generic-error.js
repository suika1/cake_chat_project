const {
  ChatNotFoundException,
  BadFieldsException,
  ChatAlreadyExistsException,
  MessageNotFoundException,
} = require('../exceptions/exceptions');
const { generateResponse } = require('../utils/utils');

// Log errors && Return respond with error
const genericErrorMiddleware = (err, req, res, next) => {
  if (!err) return next(err);

  console.warn('--------------- Error ---------------');
  console.error(err.message);
  console.warn('--------------------------------------');
  if (err instanceof ChatNotFoundException
    || err instanceof ChatAlreadyExistsException
    || err instanceof MessageNotFoundException) {
    return generateResponse({
      res,
      status: 400,
      ok: false,
      error: {
        message: err.message,
      },
    });
  } else if (err instanceof BadFieldsException) {
    return generateResponse({
      res,
      status: 400,
      ok: false,
      error: {
        message: err.message,
        fields: err.fields,
      },
    });
  }
  return generateResponse({
    res,
    status: 500,
    results: '',
    ok: false,
    error: {
      message: err.message,
    },
  });
};

module.exports = genericErrorMiddleware;
