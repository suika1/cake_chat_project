import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { Avatar, Button } from '@material-ui/core';
import moment from 'moment';
import cx from 'classnames';
import lodash from 'lodash';

import { tr, getProp } from 'utils/utils.js';
import history from 'api/browserHistory';
import styles from './styles.scss';
import CreateChat from './createChat';
import LogoutBtn from './logoutBtn';

const chatUrlRegexp = /\/chats(\/)?$/;
const chatUrlWithChatId = /\/chats\/[\d\w]{1,}(\/)?$/;

export default class ChatList extends React.Component {
  componentDidMount = () => {
    const {
      chatList,
      getChatList,
      location: {
        pathname,
      },
    } = this.props;

    if (!chatList || !chatList.length) {
      getChatList();
    } else if (chatUrlRegexp.test(pathname)) {
      history.push(`/chats/${chatList[0]._id}`);
    }
  }

  componentDidUpdate = (prevProps, prevState) => {
    const {
      location: {
        pathname,
      },
      chatList,
    } = this.props;

    if (
      // If current url is like '/chats' -> redirect to first chat in list
      chatList.length
      && !lodash.isEqual(chatList, prevProps.chatList)
      && chatUrlRegexp.test(pathname)
    ) {
      history.push(`/chats/${chatList[0]._id}`);
    } else if (
      // If current url's chat was deleted -> also redirect
      // TODO: maybe move this logic to saga...
      chatUrlWithChatId.test(pathname)
    ) {
      let pathnameWithoutSlash = pathname;
      if (pathname[pathname.length - 1] === '/') {
        pathnameWithoutSlash = pathname.slice(0, pathname.length - 1);
      }

      const currentChatId = pathnameWithoutSlash.split('/').pop();

      if (!chatList.find(chat => chat._id === currentChatId)) {
        if (chatList && chatList.length) {
          history.push(`/chats/${chatList[0]._id}`);
        } else {
          history.push('/chats/');
        }
      }
    }
  }

  render() {
    const {
      chatList,
      match,
      location,
      unselectAllMessages,
    } = this.props;
    return (
      <div className={styles.chatList}>
        <LogoutBtn
          className={styles.logoutBtn}
        />

        <div className={styles.chatGroup}>
          Public
        </div>

        <div className={styles.chatsContainer}>
          {chatList.map((chat, index) => {
            const { messages } = chat;
            const lastMessage = messages[messages.length - 1];

            return (
              <NavLink
                key={index}
                className={cx(
                  styles.link,
                  { [styles.activeLink]: location.pathname === (match.path + chat._id) },
                )}
                to={match.path + chat._id}
                onClick={() => {
                  unselectAllMessages();
                }}
              >
                <Avatar>{chat.name.charAt(0)}</Avatar>
                <div className={styles.chatInfo}>
                  <div className={styles.nameAndDate}>
                    <div className={styles.chatName}>{chat.name}</div>
                    {lastMessage &&
                      <div>{moment(lastMessage.sendTime).format('DD.MM')}</div>
                    }
                  </div>
                  {lastMessage && (
                    <div className={styles.lastMessage}>
                      <div>{`${tr(getProp(() => lastMessage.author.name, '-'), 12)}:`}</div>
                      <div>{tr(lastMessage.text, 10)}</div>
                    </div>
                  )}
                </div>
              </NavLink>
            )
          })}
        </div>
        <CreateChat />
      </div>
    );
  }
}

ChatList.propTypes = {
  chatList: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};
