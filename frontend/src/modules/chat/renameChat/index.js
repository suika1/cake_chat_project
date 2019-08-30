import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import * as actions from './actions';
import ChatRename from './component';

const mapStateToProps = store => ({
	chatName: store.currentChat.chatName,
})

const mapDispatchToProps = {
	renameChat: actions.renameChat,
}

export default withRouter(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(ChatRename)
)