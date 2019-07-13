import React from 'react';
import { TextField, Fab, Paper } from '@material-ui/core';

import PropTypes from 'prop-types';

import styles from './styles.scss';
import { getName } from 'api/localStorage';

export default class MessageForm extends React.PureComponent {
  state = {
    textValue: '',
    nameValue: '',
  };

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

    createMessage({
      data: {
        text: textValue,
        author: getName(),
        chatId,
      },
    });
  }

  render() {
    return (
      <Paper className={styles.messageForm}>
        <TextField
          className={styles.text}
          placeholder="Введите текст"
          multiline
          label="Текст"
          id="form-text"
          onChange={this.onChange('textValue')}
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
