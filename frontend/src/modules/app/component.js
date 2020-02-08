import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Router, Route, Redirect } from 'react-router-dom';

import routes from 'routes';
import NotFoundPageRoute from 'routes/not-found-page';
import { getAuthToken } from 'api/localStorage';
import history from 'api/browserHistory';
import { initializeWebsocketConnection } from 'api/websocket.js';
import * as urls from 'appConfig/appUrls';

import styles from './styles.scss';

export const authFormUrlRegexp = /\/login(\/)?$/;

export default class App extends React.Component {
  componentDidMount() {
    const {
      // TODO: move to app reducer & actions
      validateUser,
    } = this.props;

    initializeWebsocketConnection();
    validateUser();

    if (!navigator.cookieEnabled) {
      alert('Включите cookie для комфортной работы с этим сайтом');
    }
  }

  componentDidUpdate = (prevProps) => {
    const {
      currentUser,
    } = this.props;

    if (!prevProps.currentUser
      && currentUser
      && authFormUrlRegexp.test(window.location.pathname)
    ) {
      history.push('/chats/');
    }
  };

  render() {
    return (
      <Router history={history}>
        <div className={styles.app}>
          <Switch>
            {routes.map(Route => Route())}

            <Route
              exact
              path="/"
              render={() => {
                if (!getAuthToken() || getAuthToken() === '0') {
                  return <Redirect to={{ pathname: urls.authForm }} />;
                }
                if (getAuthToken() && getAuthToken() !== '0') {
                  return <Redirect to={{ pathname: urls.chats }} />;
                }
              }}
              />
            <NotFoundPageRoute />
          </Switch>
        </div>
      </Router>
    );
  }
}

App.propTypes = {
  isFetching: PropTypes.bool,
  error: PropTypes.string,
};

App.defaultProps = {
  isFetching: false,
  error: '',
}
