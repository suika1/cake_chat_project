import React from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';

import Page from 'components/page/Page';
// import Cookies from "js-cookie";
// import { COOKIE_CHATS } from 'utils/app-constants';
import { triggerGoogleLoaded } from 'actions/auth/thunks';

//import { withStyles } from '@material-ui/core/styles';

const checkCookies = () => {
  if (!navigator.cookieEnabled) {
    alert('Включите cookie для комфортной работы с этим сайтом');
  }
};

//TODO: remove
let loaded = false;

class App extends React.Component {
  componentDidMount() {
    this.attachAuthScript();
    checkCookies();
  }

  //load Google's JS lib and let user authenticate
  attachAuthScript = () => {
    const { triggerGoogleLoaded } = this.props;

    let s = document.createElement('script');
    s.src = 'https://apis.google.com/js/api.js';
    s.defer = true;
    s.onload = () => {
      triggerGoogleLoaded();
      loaded = true;
    };
    document.head.appendChild(s);
  };

  render() {
    const { page } = this.props;
    return (
      <Page
        loaded={loaded}
        error={page.error}
        isFetching={page.isFetching}
      />
    );
  }
}

App.propTypes = {
  page: PropTypes.arrayOf(PropTypes.shape({})),
  triggerGoogleLoaded: PropTypes.func.isRequired,
}

const mapStateToProps = store => {
  return {
    page: store.messages.messages,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    triggerGoogleLoaded: () => dispatch(triggerGoogleLoaded()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
