import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { withStyles } from '@material-ui/core/styles';
import { getUserInfo } from 'api/localStorage';

import * as actions from './actions';
import { selectChat } from './selectors';

import Chat from './component';

const mapStateToProps = state => {
  return {
    messages: selectChat(state).messages || [],
    isFetching: selectChat(state).isFetching || false,
    chatName: selectChat(state).chatName || '',
    chatList: state.chatList.elements || [],
    selectedMessages: selectChat(state).selectedMessages || [],
    currentUser: state.currentUser.user,
  };
};

const mapDispatchToProps = {
  getMessages: actions.getMessages,
  editChat: actions.editChat,
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Chat)
);
