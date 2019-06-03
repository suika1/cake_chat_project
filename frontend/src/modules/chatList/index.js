import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import * as actions from './actions';
import ChatListComponent from './component';

const mapStateToProps = store => {
  return {
    chatList: store.chatList.elements,
  };
};

const mapDispatchToProps = {
  getChatList: actions.getChatList,
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ChatListComponent)
);
