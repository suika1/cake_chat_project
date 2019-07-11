import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import * as actions from './actions';
import deleteChatComponent from './component';


const mapStateToProps = {
	
}

const mapDispatchToProps = {
	deleteChat: actions.deleteChat,
}

export default withRouter(
	connect(
		null,
		mapDispatchToProps
	)(deleteChatComponent)
)