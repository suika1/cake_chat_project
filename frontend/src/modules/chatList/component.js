import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Typography, Fab, TextField, Button } from '@material-ui/core';
import cx from 'classnames';

import styles from './styles.scss';
import CreateChat from './createChat'

export default class ChatList extends React.Component {
  componentDidMount = () => {
    const {
      chatList,
      getChatList,
    } = this.props;

    if (!chatList || !chatList.length) {
      getChatList();
    }
  }

  render() {
    const {
      chatList,
      match,
    } = this.props;

    return (
      <div className={styles.chatList}>
        <Typography variant="h4" className={styles.header}>
          Список диалогов
        </Typography>
        
        {chatList.map((chat, index) => (
          <NavLink
            key={index}
            className={styles.link}
            to={match.path + chat._id}
          >
            <div key={index} >
              <h3
                className={cx(
                  { [styles.activeLink]: match.params.chatKey === chat._id },
                )}
              >
                {chat.name}
              </h3>
            </div>
          </NavLink>
        ))}

        <CreateChat />
      </div>
    );
  }
}

ChatList.propTypes = {
  chatList: PropTypes.array.isRequired,
  // createChat: PropTypes.func.isRequired,
  // classes: PropTypes.shape({}),
  // match: PropTypes.shape({}),
};
