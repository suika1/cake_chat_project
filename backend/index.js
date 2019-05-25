import express from 'express';
const app = express();

import * as urls from './config/urls';
import { setupMongoConnection } from './utils/utils';

import chatRoutes from './routes/api/chat';
import messageRoutes from './routes/api/message';
import userRoutes from './routes/api/user';

import corsMiddleware from './middlewares/cors';
import genericErrorMiddleware from './middlewares/generic-error';

setupMongoConnection();

// parse application/x-www-form-urlencoded && application/json
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(corsMiddleware);
app.use(genericErrorMiddleware);

// Delegate path to router
app.use(urls.chatList, chatRoutes);
app.use(urls.messageList, messageRoutes)
app.use(urls.users, userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is listening on port ${PORT}.`));
