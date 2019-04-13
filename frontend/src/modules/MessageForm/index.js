import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { withStyles } from '@material-ui/core/styles';

import MessageForm from './component';

const mapDispatchToProps = {
};

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(MessageForm)
);
