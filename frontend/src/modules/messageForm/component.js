import React from 'react';
import { TextField, Fab, Paper } from '@material-ui/core';

import PropTypes from 'prop-types';

import styles from './styles.scss';
import { getName } from 'api/localStorage';
import { ThemeProvider } from '@material-ui/styles';

export default class MessageForm extends React.PureComponent {
  state = {
    textValue: '',
    nameValue: '',
    messageEditing: false,
    editIsStart: false,
  };

  textField = React.createRef();

  //For controlling inputs
  onChange = fieldName => e => this.setState({ [fieldName]: e.target.value });

  createOrEditMessage = () => {
    const {
      createMessage,
      editMessage,
      chatId,
      isEditing,
      messageToEdit,
    } = this.props;
    
    const {
      textValue,
    } = this.state;

    if (textValue.length < 2 || textValue.charCodeAt() === 10 || textValue.charCodeAt() === 32) return;

    if (isEditing) {
      editMessage({
        chatId,
        messageId: messageToEdit.messageId,
        text: textValue,
      })
    } else {
      createMessage({
        data: {
          text: textValue,
          author: getName(),
          chatId,
        },
      });
    }

    this.setState({ textValue: ''})
  }

  onKeyUp = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      this.createOrEditMessage();
      event.target.value = '';
    }
  }

  onKeyDown = (e) => {
    const textValue = this.state.textValue;
    if (textValue.charCodeAt() === 10 || textValue.charCodeAt() === 32 || isNaN(textValue.charCodeAt())) {
      if (event.key === 'Enter' && !event.shiftKey) {
        e.preventDefault()
      }
    } 
  }

  focusChanger = () => {

    let { isEditing, cancelEditMessage, messageToEdit } = this.props;

    this.setState({editIsStart: true })

    if (isEditing) {
      const messageForm = document.getElementById('form-text');
      messageForm.focus();

      messageForm.value = messageToEdit.text;

      messageForm.onblur = () => {
        if (isEditing) cancelEditMessage();
        messageForm.value = '';
        this.setState({editIsStart: false })
      };
    }
  }

  componentDidUpdate() {
    let { isEditing } = this.props;

    if (isEditing && !this.state.editIsStart) this.focusChanger()
  }

  render() {


    return (
      <Paper className={styles.messageForm}>
        <TextField
          ref={this.textField}
          className={styles.text}
          placeholder="Введите текст сообщения"
          multiline
          label="Сообщение"
          id="form-text"
          onChange={this.onChange('textValue')}
          onKeyUp={this.onKeyUp}
          onKeyDown={this.onKeyDown}
          variant="standard"
        />
        <Fab
          className={styles.btn}
          color="primary"
          onClick={this.createOrEditMessage}
        >
          >
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
