import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { withStyles } from '@material-ui/core/styles';

import * as actions from './actions';
import { selectChat } from './selectors';

import Chat from './component';
import { getUserInfo } from 'api/localStorage';

const mapStateToProps = state => {
  return {
    messages: selectChat(state).messages || [],
    isFetching: selectChat(state).isFetching || false,
    chatName: selectChat(state).chatName || '',
    selectedMessages: selectChat(state).selectedMessages || [],
    //user: getUserInfo(), 
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
