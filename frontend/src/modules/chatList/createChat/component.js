import React from 'react';
import PropTypes from 'prop-types';
import { Fab, TextField, Button } from '@material-ui/core';

import styles from './styles.scss';

export default class CreateChat extends React.Component {
  state = {
    showInput: false,
    chatName: '',
	};

	onChange = fieldName => e => this.setState({ [fieldName]: e.target.value });
		
	render() {
		const {
      createChat,
    } = this.props;

    const {
      chatName,
      showInput,
		} = this.state;

    if (!showInput) {
      return (
        <div className={styles.chatCreatorWrapper}>
          <Fab 
            onClick={() => this.setState({ showInput: true })} 
            color="#F9F9FA"
          >
            +
          </Fab>
        </div>
      );
    } else {
      return (
        <div className={styles.chatCreatorWrapper}>
          <TextField
            className={styles.chatNameInput}
            label="Имя чата"
            variant="outlined"
            placeholder="Введите имя чата ..."
            value={chatName}
            onChange={this.onChange('chatName')}
          />
          <Button
            className={styles.chatCreateBtn}
            onClick={() => createChat({ chatName })}
            variant="text"
          >
            Создать
          </Button>
          <br />
          <Fab
            color="#F9F9FA"
            onClick={() => this.setState({ showInput: false, chatName: '' })}
          >
            ↑
          </Fab>
        </div>
      );
    }

	}
}

CreateChat.propTypes = {
	createChat: PropTypes.func.isRequired,
}