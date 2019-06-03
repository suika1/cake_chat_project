import { connect } from 'react-redux';

import component from './component';
import * as actions from './actions';

const mapStateToProps = {

}

const mapDispatchToProps = {
  createUser: actions.createUser,
};

export default connect(
  null,
  mapDispatchToProps,
)(component);
