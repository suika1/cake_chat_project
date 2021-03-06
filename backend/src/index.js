import express from 'express';
import * as urls from './config/urls';

import chatRoutes from './routes/api/chat';
import messageRoutes from './routes/api/message';
import userRoutes from './routes/api/user';
import chatsUsersRoutes from './routes/api/chatsUsers';

import middlewares from './middlewares';

import './setup/mongo-connection';
import { initializeWebscoketServer } from './setup/websocket-server';

initializeWebscoketServer();

const app = express();

// parse application/x-www-form-urlencoded && application/json
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(middlewares.cors);

// Delegate path to router
app.use(urls.chatList, middlewares.checkToken, chatRoutes);
app.use(urls.messageList, middlewares.checkToken, messageRoutes);
app.use(urls.users, userRoutes);
app.use(urls.chatsUsers, middlewares.checkToken, chatsUsersRoutes);

app.use(middlewares.genericError);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is listening on port ${PORT}.`));
