import { connect } from 'react-redux';
import Dialog from '../components/Dialog';
import {
  getInitialMessages,
  getMessages,
  leaveChat,
} from '../actions/messages/actions';
import { withRouter } from 'react-router';

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
    getMessages: (lastId, dialogId) => dispatch(getMessages(lastId, dialogId)),
    getInitialMessages: chatKey => dispatch(getInitialMessages(chatKey)),
    leaveChat: chatKey => dispatch(leaveChat(chatKey)),
  };
};

const DialogContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Dialog);

export default withRouter(DialogContainer);
