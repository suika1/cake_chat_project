import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import * as Scroll from 'react-scroll/modules';
import { List, Button, Fab, Typography, TextField } from '@material-ui/core';

import Message from 'modules/message';

import MessageForm from '../messageForm';
import DeleteChat from './deleteChat';
import RenameChat from './renameChat';

import MessageActions from './messageActions';

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
      selectedMessages
    } = this.props;
    const { chatKey } = match.params;

    if (chatKey !== prevProps.match.params.chatKey) {
      getMessages({ chatId: chatKey })
    }

    if (!selectedMessages.length) {
      window.scrollTo(0, document.body.scrollHeight);
    }
  }

  renderMessages = () => {
    const {
      messages,
      isFetching,
      match,
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
        chatId={match.params.chatKey}
      />
    ));
  }

  render() {
    const {
      match,
      chatName,
      selectedMessages,
    } = this.props;

    const { chatKey } = match.params;

    return (
      <div className={styles.chat}>
        <div className={styles.header}>
          <RenameChat chatId={chatKey} />
          <DeleteChat chatId={chatKey} />
        </div>
        {selectedMessages.length !== 0 && (
          <MessageActions
            chatId={chatKey}
          />
          <div >
            <DeleteMessage chatId={chatKey} />
            <EditMessaage chatId={chatKey} />
          </div>
        )}

        <div className={styles.messageList}>
          {this.renderMessages()}
        </div>

        <MessageForm
          chatId={chatKey}
        />
      </div>
    );
  }
}

Chat.propTypes = {
  loaded: PropTypes.bool,
  messages: PropTypes.array.isRequired,
  error: PropTypes.string,
  getMessages: PropTypes.func.isRequired,
  leaveChat: PropTypes.func.isRequired,
  match: PropTypes.shape({}),
  isFetching: PropTypes.bool,
};

Chat.defaultProps = {
  loaded: false,
  error: '',
  isFetching: false,
}
