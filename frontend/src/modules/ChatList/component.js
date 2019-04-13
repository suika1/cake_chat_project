import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Typography, Fab, TextField, Button } from '@material-ui/core';

import styles from './styles.scss';

export default class ChatList extends React.Component {
  state = {
    showInput: false,
    chatName: '',
  };

  componentDidMount = () => {
    const {
      chatList,
      getChatList,
    } = this.props;

    if (!chatList || !chatList.length) {
      getChatList();
    }
  }

  //For controlling inputs
  onChange = fieldName => e => this.setState({ [fieldName]: e.target.value });

  renderCreateChat() {
    const {
      createChat,
    } = this.props;

    const {
      chatName,
      showInput,
    } = this.state;
    if (!showInput) {
      return (
        <Fab onClick={() => this.setState({ showInput: true })} color="primary">
          +
        </Fab>
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
            onClick={() => createChat(chatName)}
            variant="text"
          >
            Создать
          </Button>
          <br />
          <Fab
            color="primary"
            onClick={() => this.setState({ showInput: false, chatName: '' })}
          >
            ↑
          </Fab>
        </div>
      );
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
            // className={styles.chat}
            to={`/${chat._id}`}
            activeClassName={styles.activeChat}
            isActive={() => match.params.chatKey === chat._id}
          >
            <div key={index} >
              <Typography
                className={styles.link}
                variant="body2"
              >
                {chat.name}
              </Typography>
            </div>
          </NavLink>
        ))}

        {/* {this.renderCreateChat()} */}
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
