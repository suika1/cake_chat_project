const express = require('express');
const app = express();
const mongoose = require('mongoose');

const {
  ChatNotFoundException,
  BadFieldsException,
  ChatAlreadyExistsException,
  MessageNotFoundException,
} = require('./exceptions/exceptions');
const { generateResponse } = require('./utils/utils');

// Set up mongoose connection
const dev_db_url = `mongodb+srv://suika1:${process.env.MONGO_PASS}@cluster0-jgkmz.mongodb.net/cake_chat_db?retryWrites=true`;
const mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB, {useNewUrlParser: true});
// mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// parse application/x-www-form-urlencoded && application/json
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Middleware to set headers
app.use((req, res, next) => {
  res.set('Content-Type', 'application/json')
    // cors headers
    .set('Access-Control-Allow-Origin', '*')
    .set('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,')
    .set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});

// Delegate path to router
app.use('/api/v1/chat-list/', require('./routes/api/chatRoutes'));

app.use('/api/v1/message-list/', require('./routes/api/messageRoutes'));

// Log errors && Return respond with error
// TODO: move to middlewares
app.use((err, req, res, next) => {
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
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}.`));
