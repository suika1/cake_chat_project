import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { unselectAllMessages } from 'modules/message/actions';

import * as actions from './actions';
import ChatListComponent from './component';

const mapStateToProps = store => ({
  chatList: store.chatList.elements,
  messageToEdit: store.messageForm.messageToEdit,
});

const mapDispatchToProps = {
  getChatList: actions.getChatList,
  validateUser: actions.validateUser,
  deselectMessageToEdit: actions.deselectMessageToEdit,
  unselectAllMessages,
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ChatListComponent)
);
