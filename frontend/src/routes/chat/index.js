import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import ChatList from 'modules/chatList';
import Chat from 'modules/chat';

import * as urls from 'appConfig/appUrls';
import { getAuthToken } from 'api/localStorage';

const ChatRoute = () => (
  <Route
    key={urls.chats}
    path={urls.chats}
    render={(props) => {
      const {
        location: {
          pathname,
        },
      } = props;

      if ((!getAuthToken() || getAuthToken() === '0') && pathname !== urls.authForm) return <Redirect to={{pathname: urls.authForm}} />
      return (
        <React.Fragment>
          <ChatList />

          {/* <Route 
            path={urls.chats}
            component={ChatList}
          /> */}
          <Route 
            path={urls.exactChat}
            component={Chat}
          />
        </React.Fragment>
      )
    }}
  />
);

export default ChatRoute;
