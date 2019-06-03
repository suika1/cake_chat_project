import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import * as actions from './actions';

import MessageForm from './component';

const mapDispatchToProps = {
  createMessage: actions.createMessage,
};

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(MessageForm)
);
