import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { deselectMessageToEdit } from 'modules/chat/messageActions/actions';

import * as actions from './actions';

import MessageForm from './component';

const mapStateToProps = state => ({
  messageToEdit: state.messageForm.messageToEdit,
  isFetching: state.messageForm.isFetching,
});

const mapDispatchToProps = {
  createMessage: actions.createMessage,
  editMessage: actions.editMessage,
  deselectMessageToEdit,
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(MessageForm)
);
