import React from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';

import { List, Button, Fab, Typography, TextField } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import MessageForm from '../MessageForm/MessageForm';
import Message from 'components/Message/Message';
import * as Scroll from 'react-scroll/modules';

import { Link, NavLink } from 'react-router-dom';
import { withRouter } from 'react-router';

import { COOKIE_CHATS, HOMEPAGE } from 'utils/app-constants';

import Cookies from 'js-cookie';
import { getDocHeight } from 'utils/utils';
import { handleAuthClick } from 'actions/auth/thunks';

import {
  getInitialMessages,
  getMessages,
  leaveChat,
} from 'actions/messages/thunks';

import styles from './styles';

const INTERVAL = 5000;

//renders a chat window for current chat id
class Chat extends React.Component {
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
  componentDidMount() {
    const { match, getInitialMessages } = this.props;
    getInitialMessages(match.params.chatKey);
  }

  //Every component update - setup new state
  componentDidUpdate() {
    //this.resetTimer();
  }

  //clear timer before component is destroyed
  componentWillUnmount() {
    const { timerId } = this.state;
    clearInterval(timerId);
  }

  //resets intervals
  resetTimer = () => {
    const {
      match,
      getInitialMessages,
      isFetching,
    } = this.props;

    const {
      chatKey: stateChatKey,
      timerId: stateTimerId,
      newPosted: stateNewPosted,
      lastId: stateLastId,
    } = this.state;

    if (isFetching) return;
    const { messages, getMessages } = this.props;
    let chatKey = match.params.chatKey;
    let msgs;
    if (!messages.find(a => a.chatKey === chatKey)) msgs = [];
    else msgs = messages.find(a => a.chatKey === chatKey).msg;

    if (stateChatKey !== chatKey) {
      //if chat had changed
      clearInterval(stateTimerId);
      if (!msgs || msgs.length === 0) {
        //if need to initialize this chat
        getInitialMessages(chatKey);
        this.setState({
          chatKey: chatKey,
          timerId: setInterval(() => getMessages(-1, chatKey), INTERVAL),
          lastId: -1,
        });
      } else {
        let lastId = msgs[msgs.length - 1].id;
        this.setState(
          {
            timerId: setInterval(() => getMessages(lastId, chatKey), INTERVAL),
            lastId: lastId,
            chatKey: match.params.chatKey,
          },
          () => Scroll.animateScroll.scrollTo(getDocHeight()),
        );
      }
    } else if (msgs && (msgs[msgs.length - 1] || msgs.length === 0)) {
      let lastId;
      if (msgs.length === 0) {
        lastId = -1;
      } else {
        lastId = msgs[msgs.length - 1].id;
      }
      //if interval set and new messages are present
      if (stateTimerId && stateLastId !== lastId) {
        clearInterval(stateTimerId);
        if (stateNewPosted) {
          this.setState(
            {
              timerId: setInterval(
                () => getMessages(lastId, chatKey),
                INTERVAL,
              ),
              lastId: lastId,
              newPosted: false,
            },
            () => Scroll.animateScroll.scrollTo(getDocHeight()),
          );
        } else {
          this.setState(
            {
              timerId: setInterval(
                () => getMessages(lastId, chatKey),
                INTERVAL,
              ),
              lastId: lastId,
            },
            () => Scroll.animateScroll.scrollTo(getDocHeight()),
          );
        }
      } else if (stateTimerId === null && stateLastId === null) {
        //if initial state
        this.setState(
          {
            timerId: setInterval(() => getMessages(lastId, chatKey), INTERVAL),
            lastId: lastId,
          },
          () => Scroll.animateScroll.scrollTo(getDocHeight()),
        );
      }
    }
  };

  //renders list of messages
  renderMessages = messages => {
    const {
      error,
      classes,
    } = this.props;
    if (error) {
      return (
        <div>
          <Typography variant="h4">
            Error while loading messages, try to go to home chat page
          </Typography>
          <NavLink to={Cookies.getJSON(COOKIE_CHATS)[0].key}>
            <Typography variant="body1">Home chat</Typography>
          </NavLink>
        </div>
      );
    } else {
      if (messages)
        return (
          <List className={classes.messageList}>
            {messages.map(message => (
              <Message
                key={message.id}
                text={message.text}
                date={message.date}
                name={message.name}
              />
            ))}
          </List>
        );
    }
  };

  render() {
    const {
      classes,
      messages,
      getInitialMessages,
      match,
      user,
      loaded,
      leaveChat,
    } = this.props;

    const {
      timerId: stateTimerId,
      chatKey: stateChatKey,
      lastId: stateLastId,
    } = this.state;

    const chatKey = match.params.chatKey;
    let msg;
    if (!messages.find(a => a.chatKey === chatKey)) msg = [];
    else msg = messages.find(a => a.chatKey === chatKey).msg;
    // if (this.props.match.url === "/") {
    //   return <Redirect to={`/${Cookies.getJSON(COOKIE_CHATS)[0] ? Cookies.getJSON(COOKIE_CHATS)[0].key : '/1'}`} />;
    // }
    return (
      <div className={classes.chat}>
        <Typography variant="h3">
          {user.fullName !== '' ? user.fullName : ''}
        </Typography>
        <Button
          id="auth-btn"
          variant="outlined"
          onClick={
            /*TODO: remove*/ loaded
              ? () => false
              : () => handleAuthClick()
          }
        >
          {user.name === '' ? 'Войти' : 'Выйти'}
        </Button>
        <Button onClick={() => getInitialMessages(chatKey)}>
          Try to load again
        </Button>
        <Button onClick={() => clearInterval(stateTimerId)}>
          Cancel updates
        </Button>
        <Button onClick={() => Cookies.remove(COOKIE_CHATS)}>
          Clear cookies
        </Button>
        <Link
          style={{ textDecoration: 'none' }}
          to={`/${
            Cookies.getJSON(COOKIE_CHATS)[0]
              ? Cookies.getJSON(COOKIE_CHATS)[0].key
              : '/1'
            }`}
        >
          <Button onClick={() => leaveChat(stateChatKey)}>
            Leave this chat
          </Button>
        </Link>

        <div className={classes.chatLinkBlock}>
          <label htmlFor="current-chat-key">
            <Typography variant="h5">Chat link:</Typography>
          </label>
          <TextField
            className={classes.chatKeyInput}
            id="current-chat-key"
            value={`${HOMEPAGE}${chatKey}`}
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
        {this.renderMessages(msg)}
        <Fab
          color="secondary"
          className={classes.topFab}
          onClick={() => Scroll.animateScroll.scrollToTop()}
        >
          Up
        </Fab>
        <Fab
          color="secondary"
          className={classes.botFab}
          onClick={() => Scroll.animateScroll.scrollTo(getDocHeight())}
        >
          Down
        </Fab>
        <MessageForm
          lastId={stateLastId}
          onSend={() =>
            this.setState({
              newPosted: true,
            })
          }
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
  classes: PropTypes.shape({}),
};

Chat.defaultProps = {
  loaded: false,
  error: '',
  isFetching: false,
}


const mapStateToProps = store => {
  return {
    messages: store.messages.messages,
    isFetching: store.messages.isFetching,
    user: {
      name: store.auth.name,
      familyName: store.auth.familyName,
      fullName: store.auth.fullName,
      imageUrl: store.auth.imageUrl,
      email: store.auth.email,
    },
    loaded: store.auth.loaded,
    // chatKeys: store.chatKeys,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getMessages: (lastId, chatId) => dispatch(getMessages(lastId, chatId)),
    getInitialMessages: chatKey => dispatch(getInitialMessages(chatKey)),
    leaveChat: chatKey => dispatch(leaveChat(chatKey)),
  };
};

export default withStyles(styles)(
  withRouter(
    connect(
      mapStateToProps,
      mapDispatchToProps,
    )(Chat)
  )
);
