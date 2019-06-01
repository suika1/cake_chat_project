import React from 'react';
import { Route } from 'react-router-dom';

import ChatList from 'modules/chatList';
import Chat from 'modules/chat';

import * as urls from 'appConfig/appUrls';

const ChatRoute = () => (
  <Route
    key={urls.chat}
    exact
    path={urls.chat}
    render={() => (
      <React.Fragment>
        <ChatList />

        <Chat />
      </React.Fragment>
    )}
  />
);

export default ChatRoute;
