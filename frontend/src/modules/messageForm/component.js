import React from 'react';
import { TextField, Fab, Paper } from '@material-ui/core';

import PropTypes from 'prop-types';

import { getName, getUserInfo } from 'api/localStorage';

import styles from './styles.scss';

export default class MessageForm extends React.PureComponent {
  state = {
    textValue: '',
  };

  componentDidUpdate = (prevProps) => {
    const {
      messageToEdit,
      location,
      deselectMessageToEdit,
    } = this.props;

    if (!prevProps.messageToEdit
      && messageToEdit
    ) {
      this.setState({
        textValue: messageToEdit.text,
      });
    } else if (prevProps.messageToEdit
      && !messageToEdit
    ) {
      this.setState({
        textValue: '',
      });
    }

    if (location
      && (
        !prevProps.location
        || location.pathname !== prevProps.location.pathname
      )
    ) {
      deselectMessageToEdit();
    }
  }

  // For controlling inputs
  onChange = fieldName => e => this.setState({ [fieldName]: e.target.value });

  createOrEditMessage = () => {
    const {
      createMessage,
      chatId,
      messageToEdit,
      editMessage,
    } = this.props;

    const {
      textValue,
    } = this.state;

    if (textValue.length < 2
      || textValue.charCodeAt() === 10
      || textValue.charCodeAt() === 32
    ) {
      return;
    }

    if (messageToEdit) {
      editMessage({
        text: textValue,
        messageId: messageToEdit.messageId,
        chatId: messageToEdit.chatId,
      })
    } else {
      createMessage({
        data: {
          text: textValue,
          author: getName(),
          chatId,
        },
      });

      this.setState({ textValue: '' });
    }
  }

  onKeyUp = (event) => {
    const {
      messageToEdit,
      deselectMessageToEdit,
    } = this.props;
    const {
      textValue,
    } = this.state;

    if (messageToEdit && event.key === 'Escape') {
      deselectMessageToEdit();
    }

    if (event.key === 'Enter' && !event.shiftKey) {
      if (textValue[textValue.length - 1] === '\n') {
        this.setState({
          textValue: textValue.slice(0, textValue.length - 1),
        }, () => {
          this.createOrEditMessage();
        });
      } else {
        this.createOrEditMessage();
      }
    }
  }

  onKeyDown = (e) => {
    const { textValue } = this.state;
    if (textValue.charCodeAt() === 10
      || textValue.charCodeAt() === 32
      || isNaN(textValue.charCodeAt())
    ) {
      if (event.key === 'Enter' && !event.shiftKey) {
        e.preventDefault()
      }
    }
  }

  render() {
    const {
      isFetching,
    } = this.props;

    const {
      textValue,
    } = this.state;

    return (
      <Paper className={styles.messageForm}>
        <TextField
          className={styles.text}
          placeholder="Введите текст сообщения"
          multiline
          label="Сообщение"
          id="form-text"
          onChange={this.onChange('textValue')}
          onKeyUp={this.onKeyUp}
          onKeyDown={this.onKeyDown}
          variant="standard"
          value={textValue}
        />
        <Fab
          className={styles.btn}
          color="primary"
          onClick={this.createOrEditMessage}
          disabled={isFetching}
        >
          &gt;
        </Fab>
      </Paper>
    );
  }
}

MessageForm.propTypes = {
  // postMessage: PropTypes.func.isRequired,
  match: PropTypes.shape({}),
  lastId: PropTypes.number,
  onSend: PropTypes.func.isRequired,
};
