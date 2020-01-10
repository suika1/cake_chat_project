import { connect } from 'react-redux';

import AppComponent from './component';

const mapStateToProps = store => {
  return {
    currentUser: store.currentUser.user,
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AppComponent)
