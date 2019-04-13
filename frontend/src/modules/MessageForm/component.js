import React from 'react';
import { TextField, Fab, Paper } from '@material-ui/core';

import PropTypes from 'prop-types';

import styles from './styles.scss';

export default class MessageForm extends React.PureComponent {
  state = {
    textValue: '',
  };

  //For controlling inputs
  onChange = fieldName => e => this.setState({ [fieldName]: e.target.value });

  render() {
    const {
      textValue,
    } = this.state;

    return (
      <Paper className={styles.messageForm}>
        <TextField
          className={styles.name}
          label="Имя"
          id="form-name"
          onChange={this.onChange('nameValue')}
          placeholder={'Имя'}
          variant="standard"
        />
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
          onClick={this.onSend}
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
