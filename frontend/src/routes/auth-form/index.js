import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import AuthFormComponent from 'modules/auth-form';

import * as urls from 'appConfig/appUrls';
import { getUserInfo } from 'api/localStorage';

const AuthFormRoute = () => (
  <Route
    key={urls.authForm}
    exact
    path={urls.authForm}
    render={() => {
      return <AuthFormComponent />
    }}
  />
);

export default AuthFormRoute;
