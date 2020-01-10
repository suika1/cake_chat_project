import React from 'react';
import PropTypes from 'prop-types';

import { Typography } from '@material-ui/core';

import Message from 'modules/message';
import { subscribeToChat } from 'api/websocket';

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
    const {
      match: {
        params: {
          chatKey: chatId,
        },
      },
      getMessages,
      currentUser,
    } = this.props;

    getMessages({ chatId });
    if (currentUser) {
      subscribeToChat({
        userId: currentUser._id,
        chatId,
      });
    }
  }

  componentDidUpdate = (prevProps) => {
    const {
      match,
      getMessages,
      selectedMessages,
      currentUser,
    } = this.props;
    const { chatKey: chatId } = match.params;

    if (chatId !== prevProps.match.params.chatKey) {
      getMessages({ chatId });

      if (currentUser) {
        subscribeToChat({
          userId: currentUser._id,
          chatId,
        });
      }
    } else if (!prevProps.currentUser && currentUser) {
      subscribeToChat({
        userId: currentUser._id,
        chatId,
      });
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
      selectedMessages,
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
        isSelected={selectedMessages.find(msg => msg.messageId === item._id)}
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
          <React.Fragment>
            <MessageActions
              chatId={chatKey}
            />
          </React.Fragment>
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
