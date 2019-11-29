import React from 'react';

import {
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
} from '@material-ui/core';

import { getUserInfo } from 'api/localStorage';

import styles from './styles.scss';

export default class MessageActions extends React.Component {
  state = {
    showConfirmDeleteMessage: false,
  }

  renderConfirmDeleteMessage = () => {
    const {
      props: {
        deleteMessage,
        selectedMessages,
      },
      state: {
        showConfirmDeleteMessage,
      },
    } = this;

    if (!showConfirmDeleteMessage) {
      return '';
    }

    const handleClose = () => this.setState({ showConfirmDeleteMessage: false });

    return (
      <Dialog
        onClose={handleClose}
        className={styles.deleteMsgModal}
        open
      >
        <DialogTitle>
          Do you really want to delete this message?
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose} className={styles.cancelBtn}>
            CANCEL
          </Button>
          <Button
            className={styles.deleteBtn}
            onClick={() => {
              if (selectedMessages && selectedMessages.length === 1) {
                deleteMessage({ message: selectedMessages[0] });
                handleClose();
              }
            }}
          >
            DELETE
          </Button>
        </DialogActions>
      </Dialog>
    )
  }

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
        {this.renderConfirmDeleteMessage()}
        {selectedMessages[0].authorId === user_id
          && !messageToEdit
          && (
            <>
              <Button onClick={() => selectMessageToEdit({ message: selectedMessages[0] })}>
                EDIT
              </Button>
              <Button
                onClick={() => this.setState({
                  showConfirmDeleteMessage: true,
                })}
              >
                DELETE
              </Button>
            </>
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
