import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import * as actions from './actions';
import InviteUsersToChat from './component';

const mapStateToProps = store => ({
  allUsers: store.inviteUsersToChat.allUsers,
  inviteRequest: store.inviteUsersToChat.inviteRequest,
})

const mapDispatchToProps = {
  findAllUsersNotPresentedInChat: actions.findAllUsersNotPresentedInChat,
  inviteUsersToChat: actions.inviteUsersToChat,
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(InviteUsersToChat)
);
