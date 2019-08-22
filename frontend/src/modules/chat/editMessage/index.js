import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import * as actions from './actions';
import editMessageComponent from './component';


const mapStateToProps = state => ({
	selectedMessages: state.currentChat.selectedMessages || [],
	//messageId: state.currentChat.selectedMessages[0].messageId,
	//chatId: state.currentChat.selectedMessages[0].chatId,
	//text: state.currentChat.selectedMessages[0].text,
})

const mapDispatchToProps = {
	focusOnForm: actions.focusOnForm,
}

export default withRouter(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(editMessageComponent)
)