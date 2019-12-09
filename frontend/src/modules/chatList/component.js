import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { Typography, Fab, TextField, Button, MenuList, MenuItem, Avatar } from '@material-ui/core';
import { styled } from '@material-ui/styles';
import moment from 'moment';
import cx from 'classnames';
import lodash from 'lodash';

import { tr, getProp } from 'utils/utils.js';
import styles from './styles.scss';
import CreateChat from './createChat';

const chatUrlRegexp = /\/chats(\/)?$/;

export default class ChatList extends React.Component {
  componentDidMount = () => {
    const {
      chatList,
      getChatList,
      validateUser,
      pathname,
    } = this.props;

    if (!chatList || !chatList.length) {
      getChatList();
    } else if (chatUrlRegexp.test(pathname)) {
      window.location.pathname = `/chats/${chatList[0]._id}`;
    }

    validateUser();
  }

  componentDidUpdate = (prevProps, prevState) => {
    const {
      pathname,
      chatList,
    } = this.props;

    if (chatList.length
      && !lodash.isEqual(chatList, prevProps.chatList)
      && chatUrlRegexp.test(pathname)
    ) {
      window.location.pathname = `/chats/${chatList[0]._id}`;
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
                  { [styles.activeLink]: location.pathname === (match.path + chat._id)},
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
