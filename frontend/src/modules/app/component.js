import React from 'react';
import PropTypes from 'prop-types';
import { Switch, BrowserRouter as Router } from 'react-router-dom';

import routes from 'routes';
import NotFoundPageRoute from 'routes/not-found-page';

import styles from './styles.scss';

export default class App extends React.Component {
  componentDidMount() {
    if (!navigator.cookieEnabled) {
      alert('Включите cookie для комфортной работы с этим сайтом');
    }
  }

  render() {
    return (
      <Router>
        <div className={styles.app}>
          <Switch>
            {routes.map(Route => Route())}

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
