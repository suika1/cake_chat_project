import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import * as Scroll from 'react-scroll/modules';
import { List, Button, Fab, Typography, TextField } from '@material-ui/core';

import MessageForm from '../MessageForm';
import Message from 'modules/Message';

import { getDocHeight } from 'utils/utils';

import styles from './styles.scss';

export default class Chat extends React.Component {
  constructor(props) {
    super(props);
    const { match } = this.props
    this.state = {
      timerId: null,
      lastId: null,
      chatKey: match.params.chatKey,
      newPosted: false,
    };
  }

  //onMount - scrolls to bottom
  componentDidMount = () => {
    const { match, getMessages } = this.props;
    getMessages(match.params.chatKey);
  }

  //Every component update - setup new state
  componentDidUpdate = () => {
    //this.resetTimer();
  }

  //clear timer before component is destroyed
  componentWillUnmount = () => {
    const { timerId } = this.state;
    clearInterval(timerId);
  }

  render() {
    const {
      classes,
      messages,
      getInitialMessages,
      match,
      loaded,
      leaveChat,
    } = this.props;

    const {
      timerId: stateTimerId,
      chatKey: stateChatKey,
      lastId: stateLastId,
    } = this.state;

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
              let input = document.getElementById('current-chat-key');
              input.select();
              document.execCommand('copy');
            }}
          >
            Copy
          </Fab>
        </div>

        <Fab
          color="secondary"
          className={styles.topFab}
          onClick={() => Scroll.animateScroll.scrollToTop()}
        >
          Up
        </Fab>

        <Fab
          color="secondary"
          className={styles.botFab}
          onClick={() => Scroll.animateScroll.scrollTo(getDocHeight())}
        >
          Down
        </Fab>

        <MessageForm
          onSend={() => console.log('clicked on send')}
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
