import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import * as actions from './actions';
import DeleteMessage from './component';


const mapStateToProps = store => ({
	selectedMessages: store.currentChat.selectedMessages
})

const mapDispatchToProps = {
	deleteMessage: actions.deleteMessage,
}

export default withRouter(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(DeleteMessage)
)