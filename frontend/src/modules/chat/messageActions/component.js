import React from 'react';

import {
  Button,
} from '@material-ui/core';

import { getUserInfo } from 'api/localStorage';

import styles from './styles.scss';

export default class MessageActions extends React.Component {
  render() {
    const {
      selectedMessages,
      selectMessageToEdit,
      messageToEdit,
      deselectMessageToEdit,
      unselectMessage,
    } = this.props;

    const {
      user_id,
    } = getUserInfo();

    if (!selectedMessages
      || selectedMessages.length !== 1
      || selectedMessages[0].authorId !== user_id
    ) {
      return '';
    }

    return (
      <div className={styles.headMenu}>
        {selectedMessages[0].authorId === user_id
          && !messageToEdit
          && (
            <Button onClick={() => selectMessageToEdit({ message: selectedMessages[0] })}>
              EDIT
            </Button>
          )}
        {messageToEdit && (
          <Button
            onClick={() => {
              const { chatId, messageId } = messageToEdit;
              deselectMessageToEdit();
              unselectMessage({ chatId, messageId });
            }}
            className={styles.cancelBtn}
          >
            CANCEL EDIT
          </Button>
        )}
      </div>
    )
  }
}
