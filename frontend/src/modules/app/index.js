import { connect } from 'react-redux';

import { validateUser } from 'modules/chatList/actions';

import AppComponent from './component';

const mapStateToProps = store => {
  return {
    currentUser: store.currentUser.user,
  };
};

const mapDispatchToProps = {
  validateUser,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AppComponent)
