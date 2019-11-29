import { connect } from 'react-redux';

import { unselectMessage } from 'modules/message/actions';

import component from './component';
import * as actions from './actions';

const mapStateToProps = state => ({
  selectedMessages: state.currentChat.selectedMessages || [],
  messageToEdit: state.messageForm.messageToEdit,
});

const mapDispatchToProps = {
  selectMessageToEdit: actions.selectMessageToEdit,
  deselectMessageToEdit: actions.deselectMessageToEdit,
  deleteMessage: actions.deleteMessage,
  unselectMessage,
};

export default connect(mapStateToProps, mapDispatchToProps)(component);
