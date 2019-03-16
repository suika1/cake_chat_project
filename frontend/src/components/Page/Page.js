import React from 'react';

import PropTypes from 'prop-types';

import { Switch, Route, Link, BrowserRouter as Router } from 'react-router-dom';

// import { Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import Chat from 'modules/Chat/Chat';
import ChatList from 'modules/ChatList/ChatList';
// import { handleAuthClick } from 'actions/auth/actions';

const styles = {
  page: {
    display: 'flex',
    maxWidth: '1300px',
    margin: '0 auto',
  },
  '@media (max-width: 900px)': {
    page: {
      flexDirection: 'column',
      alignItems: 'center',
    },
  },
};

//TODO: authorization

const Routes = ['/:chatKey', '/'];

//renders a full page, which includes left-side dialog list and right-side dialog window
const Page = (classes, loaded, error) => (
  <Router>
    <div className={classes.page}>
      <Switch>
        {Routes.map((path, index) => (
          <Route
            exact
            path={path}
            key={index}
            render={() => (
              <React.Fragment>
                <ChatList
                  loaded={loaded}
                />
                <Chat error={error} />
              </React.Fragment>
            )}
          />
        ))}
        {/*If wrong url*/}
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

Page.propTypes = {
  isFetching: PropTypes.bool,
  error: PropTypes.string,
};

Page.defaultProps = {
  isFetching: false,
  error: '',
}

export default withStyles(styles)(Page);
