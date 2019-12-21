import { connect } from 'react-redux';

import component from './component';
import * as actions from './actions';

const mapStateToProps = state => ({
  backendErrors: state.authForm.backendErrors,
});

const mapDispatchToProps = {
  createUser: actions.createUser,
  loginUser: actions.loginUser,
  setBackendError: actions.setBackendError,
  clearBackendError: actions.clearBackendError,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(component);
