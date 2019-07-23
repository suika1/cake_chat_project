import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import * as actions from './actions';
import CreateChatComponent from './component';

const mapDispatchToProps = {
	createChat: actions.createChat
}

export default withRouter(
	connect(
		null,
		mapDispatchToProps
	)(CreateChatComponent)
)