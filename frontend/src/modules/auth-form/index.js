import { connect } from 'react-redux';

import component from './component';
import * as actions from './actions';

const mapStateToProps = {

}

const mapDispatchToProps = {
  createUser: actions.createUser,
  loginUser: actions.loginUser,
};

export default connect(
  null,
  mapDispatchToProps,
)(component);
