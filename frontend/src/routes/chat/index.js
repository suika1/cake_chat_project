import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import ChatList from 'modules/chatList';
import Chat from 'modules/chat';

import * as urls from 'appConfig/appUrls';
import { getAuthToken } from 'api/localStorage';

const ChatRoute = () => (
  <Route
    key={urls.chats}
    exact
    path={urls.chats}
    render={(props) => {
      const {
        location: {
          pathname,
        },
      } = props;

      if (!getAuthToken() && pathname !== urls.authForm) return <Redirect to={{pathname: urls.authForm}} />
      return (
        <React.Fragment>
          <ChatList />

          <Chat />
        </React.Fragment>
      )
    }}
  />
);

export default ChatRoute;
