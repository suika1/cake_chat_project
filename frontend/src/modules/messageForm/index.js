import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import * as actions from './actions';
import { editMessage, cancelEditMessage } from '../chat/editMessage/actions'

import MessageForm from './component';

const mapStateToProps = state => ({
  isEditing: state.editMessage.isEditing,
  messageToEdit: state.currentChat.selectedMessages[0],
})

const mapDispatchToProps = {
  createMessage: actions.createMessage,
  editMessage,
  cancelEditMessage,
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(MessageForm)
);
