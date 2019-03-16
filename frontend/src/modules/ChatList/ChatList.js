import React from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';

import { Typography, Fab, TextField, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import { NavLink } from 'react-router-dom';
import { withRouter } from 'react-router';

import { createChat } from 'actions/messages/actions';

import styles from './styles';

//renders list of chats in left side of screen
class ChatList extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showInput: false,
      chatName: '',
    };
  }

  //For controlling inputs
  onChange = fieldName => e => this.setState({ [fieldName]: e.target.value });

  renderCreateChat() {
    const {
      classes,
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
        <div className={classes.chatCreatorWrapper}>
          <TextField
            className={classes.chatNameInput}
            label="Имя чата"
            variant="outlined"
            placeholder="Введите имя чата ..."
            value={chatName}
            onChange={this.onChange('chatName')}
          />
          <Button
            className={classes.chatCreateBtn}
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
      classes,
      chats,
      match,
    } = this.props;

    return (
      <div className={classes.chats}>
        <Typography variant="h4" className={classes.header}>
          Список диалогов
        </Typography>
        
        {chats.map((chat, index) => (
          <NavLink
            key={index}
            className={classes.chat}
            to={`/${chat.key}`}
            activeClassName={classes.activeChat}
            isActive={() => match.params.chatKey === chat.key}
          >
            <div>
              <Typography className={classes.link} variant="body2">
                {chat.name}
              </Typography>
            </div>
          </NavLink>
        ))}

        {this.renderCreateChat()}
      </div>
    );
  }
}

ChatList.propTypes = {
  chats: PropTypes.array.isRequired,
  createChat: PropTypes.func.isRequired,
  classes: PropTypes.shape({}),
  match: PropTypes.shape({}),
};

const mapStateToProps = store => {
  return {
    chats: store.messages.chats,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createChat: chatName => dispatch(createChat(chatName)),
  };
};

export default withStyles(styles)(
  withRouter(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(ChatList)
  )
);
