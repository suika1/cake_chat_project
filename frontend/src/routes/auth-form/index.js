import React from 'react';
import { Route } from 'react-router-dom';

import AuthFormComponent from 'modules/auth-form';

import * as urls from 'appConfig/appUrls';

const AuthFormRoute = () => (
  <Route
    key={urls.authForm}
    exact
    path={urls.authForm}
    component={AuthFormComponent}
  />
);

export default AuthFormRoute;
