import React from 'react';
import DialogContainer from '../modules/DialogContainer';
import DialogListContainer from '../modules/DialogListContainer';
import PropTypes from 'prop-types';
import { Switch, Route, Link, BrowserRouter as Router } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { handleAuthClick } from '../actions/auth/actions';

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

//renders a full page, which includes left-side dialog list and right-side dialog window
class Page extends React.Component {
  render() {
    return (
      <Router>
        <div className={this.props.classes.page}>
          <Switch>
            {['/:chatKey', '/'].map((path, index) => (
              <Route
                exact
                path={path}
                key={index}
                render={() => (
                  <React.Fragment>
                    <DialogListContainer
                      loaded={this.props.loaded} //TODO: remove
                    />
                    <DialogContainer error={this.props.error} />
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
  }
}

Page.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
};

export default withStyles(styles)(Page);
