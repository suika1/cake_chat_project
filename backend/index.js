const express = require('express');
const app = express();
const {
  ChatNotFoundException,
  BadFieldsException,
  ChatAlreadyExistsException,
} = require('./exceptions/exceptions');
const { generateResponse } = require('./utils/utils');

// parse application/x-www-form-urlencoded && application/json
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Middleware to set headers
app.use((req, res, next) => {
  res
    .set('Content-Type', 'application/json')
    .set('Access-Control-Allow-Origin', '*');
  next();
});

// Delegate '/' path to router
app.use('/', require('./routes/api/chatRoutes'));

// Log errors && Return response with error
app.use((err, req, res, next) => {
  console.warn('\n--------------- Error ---------------\n', err.message);
  if (err instanceof ChatNotFoundException
    || err instanceof ChatAlreadyExistsException ) {
    console.warn('--------------------------------------\n');
    return generateResponse({
      res,
      status: 400,
      error: err.message,
    });
  } else if (err instanceof BadFieldsException) {
    return generateResponse({
      res,
      status: 400,
      error: {
        message: err.message,
        fields: err.fields,
      },
    });
  }
  console.warn('--------------------------------------\n');
  return generateResponse({
    res,
    status: 500,
    results: '',
    error: 'Internal server error',
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}.`));
