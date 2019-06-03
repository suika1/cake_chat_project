import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import * as Scroll from 'react-scroll/modules';
import { List, Button, Fab, Typography, TextField } from '@material-ui/core';

import MessageForm from '../messageForm';
import Message from 'modules/message';

import styles from './styles.scss';

export default class Chat extends React.Component {
  constructor(props) {
    super(props);
    const { match } = this.props
    this.state = {
      chatKey: match.params.chatKey,
      newPosted: false,
    };
  }

  componentDidMount = () => {
    const { match, getMessages } = this.props;
    getMessages({ chatId: match.params.chatKey });
  }

  componentDidUpdate = (prevProps) => {
    const {
      match,
      getMessages,
    } = this.props;
    const chatKey = match.params.chatKey;

    if (chatKey !== prevProps.match.params.chatKey) {
      getMessages({ chatId: chatKey })
    }
  }

  renderMessages = () => {
    const {
      messages,
      isFetching,
    } = this.props;

    if (isFetching) {
      return (
        <Typography
          className={styles.loader}
          variant="h3"
        >
          Loading...
        </Typography>
      )
    }

    return messages.map(item => (
      <Message
        key={item._id}
        data={item}
      />
    ));
  }

  render() {
    const {
      match,
    } = this.props;

    const chatKey = match.params.chatKey;

    return (
      <div className={styles.chat}>
        <div className={styles.chatLinkBlock}>
          <label htmlFor="current-chat-key">
            <Typography variant="h5">Chat link:</Typography>
          </label>
          <TextField
            className={styles.chatKeyInput}
            id="current-chat-key"
            value={chatKey}
            variant="outlined"
          />
          <Fab
            onClick={() => {
              const input = document.getElementById('current-chat-key');
              input.select();
              document.execCommand('copy');
            }}
          >
            Copy
          </Fab>
        </div>

        {this.renderMessages()}

        <MessageForm
          onSend={() => console.log('clicked on send')}
          chatId={chatKey}
        />
      </div>
    );
  }
}

Chat.propTypes = {
  //chatKeys: PropTypes.array.isRequired,
  //TODO: remove:
  user: PropTypes.object.isRequired,
  loaded: PropTypes.bool,
  messages: PropTypes.array.isRequired,
  error: PropTypes.string,
  getMessages: PropTypes.func.isRequired,
  getInitialMessages: PropTypes.func.isRequired,
  leaveChat: PropTypes.func.isRequired,
  match: PropTypes.shape({}),
  isFetching: PropTypes.bool,
};

Chat.defaultProps = {
  loaded: false,
  error: '',
  isFetching: false,
}
