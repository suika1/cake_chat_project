import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Link, BrowserRouter as Router } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';

import Chat from 'modules/Chat';
import ChatList from 'modules/ChatList';

import styles from './styles.scss';

const Routes = ['/:chatKey', '/'];

const checkCookies = () => {
  if (!navigator.cookieEnabled) {
    alert('Включите cookie для комфортной работы с этим сайтом');
  }
};

export default class App extends React.Component {
  componentDidMount() {
    checkCookies();
  }

  render() {
    return (
      <Router>
        <div className={styles.app}>
          <Switch>
            {Routes.map((path, index) => (
              <Route
                exact
                path={path}
                key={index}
                render={() => (
                  <React.Fragment>
                    <ChatList />

                    <Chat />
                  </React.Fragment>
                )}
              />
            ))}
            {/*If wrong url*/}

            {/* TODO: move to 404page component */}
            <Route
              render={() => (
                <div>
                  <h3>Sorry, it's wrong URL</h3>
                  <p>
                    You can navigate to <Link to="/">Home</Link> page:{' '}
                  </p>
                </div>
              )}
            />
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
