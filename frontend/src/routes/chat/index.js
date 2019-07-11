import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import ChatList from 'modules/chatList';
import Chat from 'modules/chat';
//import styles from 'styles.scss';

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
        <div style={{
          display: 'flex', 
          width: '1280px', 
          position: 'relative',
          //boxShadow: '0px 0px 86px 53px rgba(0,0,0,0.12)'
          boxShadow: 'rgba(0, 0, 0, 0.1) 0px 0px 40px 5px'
          }}>
          <ChatList />

          {/* <Route 
            path={urls.chats}
            component={ChatList}
          /> */}
          <Route 
            path={urls.exactChat}
            component={Chat}
          />
        </div>
      )
    }}
  />
);

export default ChatRoute;
