import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Avatar } from '@material-ui/core';
import moment from 'moment';
import cx from 'classnames';
import { getId } from 'api/localStorage'

import styles from './styles.scss';

class Message extends React.PureComponent {
  selectMessageHandler = () => {
    const {
      data: {
        text,
        _id,
        author,
      },
      chatId,
      selectMessage,
      unselectMessage,
      isSelected,
      messageToEdit,
    } = this.props;

    if (messageToEdit) {
      return;
    }

    if (isSelected) {
      unselectMessage({ chatId, messageId: _id })
    } else {
      selectMessage({ chatId, messageId: _id, text, authorId: author._id, })
    }
  }

  render() {
    const {
      data: {
        sendTime,
        author: {
          name,
          _id,
        },
        text,
      },
      isSelected,
    } = this.props;

    const msgTime = moment(sendTime).format('HH:mm');
    const isOwn = _id === getId();

    return (
      <div
        className={cx(styles.wrapper,
          { [styles.right]: isOwn },
          { [styles.selected]: isSelected }
        )}
        onClick={this.selectMessageHandler}
      >
        {!isOwn && <Avatar>{name.charAt(0)}</Avatar>}
        <div className={styles.message}>
          {!isOwn && (
            <div className={styles.name}>
              {name}
            </div>
          )}
          <div>
            {text}
          </div>
          <div className={styles.time}>
            {msgTime}
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Message);
