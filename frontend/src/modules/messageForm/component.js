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
  };

  textField = React.createRef();

  //For controlling inputs
  onChange = fieldName => e => this.setState({ [fieldName]: e.target.value });

  createMessage = () => {
    const {
      createMessage,
      chatId,
    } = this.props;
    
    const {
      textValue,
    } = this.state;

    if (textValue.length < 2 || textValue.charCodeAt() === 10 || textValue.charCodeAt() === 32) return;

    createMessage({
      data: {
        text: textValue,
        author: getName(),
        chatId,
      },
    });

    this.setState({ textValue: ''})
  }

  onKeyUp = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      this.createMessage();
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

  render() {
    return (
      <Paper className={styles.messageForm}>
        <TextField
          ref={this.textField}
          className={styles.text}
          placeholder="Введите текст"
          multiline
          label="Текст"
          id="form-text"
          onChange={this.onChange('textValue')}
          onKeyUp={this.onKeyUp}
          onKeyDown={this.onKeyDown}
          variant="standard"
        />
        <Fab
          className={styles.btn}
          color="primary"
          onClick={this.createMessage}
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
