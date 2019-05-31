import express from 'express';
const app = express();

import * as urls from './config/urls';
import { setupMongoConnection } from './utils/utils';
import startWebsocketServer from './utils/websocket-server';

import chatRoutes from './routes/api/chat';
import messageRoutes from './routes/api/message';
import userRoutes from './routes/api/user';

import middlewares from './middlewares';

setupMongoConnection();
startWebsocketServer();

// parse application/x-www-form-urlencoded && application/json
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(middlewares.cors);

// Delegate path to router
app.use(urls.chatList, middlewares.checkToken, chatRoutes);
app.use(urls.messageList, middlewares.checkToken, messageRoutes);
app.use(urls.users, userRoutes);

app.use(middlewares.genericError);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is listening on port ${PORT}.`));
