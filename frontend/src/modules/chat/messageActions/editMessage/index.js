import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import * as actions from './actions';
import editMessageComponent from './component';


const mapStateToProps = state => ({
  selectedMessages: state.currentChat.selectedMessages || [],
})

const mapDispatchToProps = {
  focusOnForm: actions.focusOnForm,
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(editMessageComponent)
);
