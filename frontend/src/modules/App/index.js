import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import AppComponent from './component';

const mapStateToProps = store => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AppComponent);