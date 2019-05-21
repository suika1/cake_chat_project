const express = require('express');
const app = express();

const urls = require('./config/urls');

const { setupMongoConnection } = require('./utils/utils');

setupMongoConnection();

// parse application/x-www-form-urlencoded && application/json
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(require('./middlewares/cors'));
app.use(require('./middlewares/generic-error'));

// Delegate path to router
app.use(urls.chatList, require('./routes/api/chat'));
app.use(urls.messageList, require('./routes/api/message'));
app.use(urls.users, require('./routes/api/user'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is listening on port ${PORT}.`));
