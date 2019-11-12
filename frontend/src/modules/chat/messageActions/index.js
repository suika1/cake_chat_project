import { connect } from 'react-redux';

import component from './component';
import * as actions from './actions';

const mapStateToProps = state => ({
  selectedMessages: state.currentChat.selectedMessages || [],
});

const mapDispatchToProps = {
  selectMessageToEdit: actions.selectMessageToEdit,
};

export default connect(mapStateToProps, mapDispatchToProps)(component);
