import React from "react";
import { List, Button, Fab, Typography, TextField } from "@material-ui/core";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import MessageFormContainer from "../modules/MessageFormContainer";
import Message from "./Message";
import * as Scroll from "react-scroll/modules";
import { Link, NavLink, Redirect } from "react-router-dom";
import { COOKIE_CHATS, HOMEPAGE } from "../actions/MessageActions";
import Cookies from "js-cookie";
import { getDocHeight } from "../utils/utils";
import { handleAuthClick } from "../actions/AuthActions";

const styles = {
  dialog: {
    position: "relative",
    width: "70%",
    padding: "20px",
    margin: "15px 0",
    left: "20%"
  },
  messageList: {
    margin: "50px auto",
    width: "70%",
    maxWidth: "800px"
  },
  topFab: {
    position: "fixed",
    bottom: "140px",
    right: "10%"
  },
  chatKeyInput: {
    width: "60%"
  },
  botFab: {
    position: "fixed",
    bottom: "70px",
    right: "10%"
  },
  "@media (max-width: 1200px)": {
    dialog: {
      left: "25%"
    }
  },
  "@media (max-width: 900px)": {
    dialog: {
      textAlign: "center",
      margin: "0",
      width: "100%",
      left: "0"
    },
    messageList: {
      width: "95%",
      paddingRight: "50px"
    },
    chatKeyInput: {
      width: "100%"
    },
    topFab: {
      right: "5px"
    },
    botFab: {
      right: "5px"
    },
    chatLinkBlock: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      "& > * + *": {
        marginTop: "10px"
      }
    }
  }
};

const INTERVAL = 5000;

//renders a dialog window for current dialog id
class Dialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timerId: null,
      lastId: null,
      chatKey: this.props.match.params.chatKey,
      newPosted: false
    };
  }

  //onMount - scrolls to bottom
  componentDidMount() {
    this.props.getInitialMessages(this.props.match.params.chatKey);
  }

  //Every component update - setup new state
  componentDidUpdate() {
    console.log(`dialog did update`) ||
      console.log(this.props) ||
      console.log(this.state);
    //this.resetTimer();
  }

  //clear timer before component is destroyed
  componentWillUnmount() {
    clearInterval(this.state.timerId);
  }

  //resets intervals
  resetTimer = () => {
    if (this.props.isFetching) return;
    //console.log(`doc height ::`) || console.log(getDocHeight());
    let { messages, getMessages } = this.props;
    let chatKey = this.props.match.params.chatKey;
    let msgs;
    if (!messages.find(a => a.chatKey === chatKey)) msgs = [];
    else msgs = messages.find(a => a.chatKey === chatKey).msg;

    if (this.state.chatKey !== chatKey) {
      //if dialog had changed
      clearInterval(this.state.timerId);
      if (!msgs || msgs.length === 0) {
        //if need to initialize this dialog
        this.props.getInitialMessages(chatKey);
        this.setState({
          chatKey: chatKey,
          timerId: setInterval(() => getMessages(-1, chatKey), INTERVAL),
          lastId: -1
        });
      } else {
        let lastId = msgs[msgs.length - 1].id;
        this.setState(
          {
            timerId: setInterval(() => getMessages(lastId, chatKey), INTERVAL),
            lastId: lastId,
            chatKey: this.props.match.params.chatKey
          },
          () => Scroll.animateScroll.scrollTo(getDocHeight())
        );
      }
    } else if (msgs && (msgs[msgs.length - 1] || msgs.length === 0)) {
      let lastId;
      if (msgs.length === 0) {
        lastId = -1;
      } else {ss
        lastId = msgs[msgs.length - 1].id;
      }
      //if interval set and new messages are present
      if (this.state.timerId && this.state.lastId !== lastId) {
        clearInterval(this.state.timerId);
        if (this.state.newPosted) {
          this.setState(
            {
              timerId: setInterval(
                () => getMessages(lastId, chatKey),
                INTERVAL
              ),
              lastId: lastId,
              newPosted: false
            },
            () => Scroll.animateScroll.scrollTo(getDocHeight())
          );
        } else {
          this.setState(
            {
              timerId: setInterval(
                () => getMessages(lastId, chatKey),
                INTERVAL
              ),
              lastId: lastId
            },
            () => Scroll.animateScroll.scrollTo(getDocHeight())
          );
        }
      } else if (this.state.timerId === null && this.state.lastId === null) {
        //if initial state
        this.setState(
          {
            timerId: setInterval(() => getMessages(lastId, chatKey), INTERVAL),
            lastId: lastId
          },
          () => Scroll.animateScroll.scrollTo(getDocHeight())
        );
      }
    }
  };

  //renders list of messages
  renderMessages = messages => {
    if (this.props.error) {
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
          <List className={this.props.classes.messageList}>
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
    let { classes, messages, getInitialMessages } = this.props;
    let chatKey = this.props.match.params.chatKey;
    let msg;
    if (!messages.find(a => a.chatKey === chatKey)) msg = [];
    else msg = messages.find(a => a.chatKey === chatKey).msg;
    //console.log(`location == `) || console.log(this.props.location);
    if (this.props.match.url === "/") {
      return <Redirect to={`/${Cookies.getJSON(COOKIE_CHATS)[0].key}`} />;
    }
    return (
      <div className={classes.dialog}>
        <Typography variant="h3">
          {this.props.user.fullName !== "" ? this.props.user.fullName : ""}
        </Typography>
        <Button
          id="auth-btn"
          variant="outlined"
          onClick={
            /*TODO: remove*/ this.props.loaded
              ? () => false
              : () => handleAuthClick()
          }
        >
          {this.props.user.name === "" ? "Войти" : "Выйти"}
        </Button>
        <Button onClick={() => getInitialMessages(chatKey)}>
          Try to load again
        </Button>
        <Button onClick={() => clearInterval(this.state.timerId)}>
          Cancel updates
        </Button>
        <Button onClick={() => Cookies.remove(COOKIE_CHATS)}>
          Clear cookies
        </Button>
        <Link
          style={{ textDecoration: "none" }}
          to={`/${Cookies.getJSON(COOKIE_CHATS)[0].key}`}
        >
          <Button onClick={() => this.props.leaveChat(this.state.chatKey)}>
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
              let input = document.getElementById("current-chat-key");
              input.select();
              document.execCommand("copy");
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
        <MessageFormContainer
          lastId={this.state.lastId}
          onSend={() =>
            this.setState({
              newPosted: true
            })
          }
        />
      </div>
    );
  }
}

Dialog.propTypes = {
  //chatKeys: PropTypes.array.isRequired,
  //TODO: remove:
  user: PropTypes.object.isRequired,
  loaded: PropTypes.bool.isRequired,
  messages: PropTypes.array.isRequired,
  error: PropTypes.string.isRequired,
  getMessages: PropTypes.func.isRequired,
  getInitialMessages: PropTypes.func.isRequired,
  leaveChat: PropTypes.func.isRequired
};

export default withStyles(styles)(Dialog);
