import { connect } from 'react-redux';

import component from './component';

const mapStateToProps = state => ({
  selectedMessages: state.currentChat.selectedMessages || [],
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(component);
