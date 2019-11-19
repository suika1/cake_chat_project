import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import * as actions from './actions';
import Message from './component';

const mapStateToProps = store => ({
  messageToEdit: store.messageForm.messageToEdit,
});

const mapDispatchToProps = {
  selectMessage: actions.selectMessage,
  unselectMessage: actions.unselectMessage,
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Message)
);
