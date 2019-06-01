import React from 'react';
import { Route } from 'react-router-dom';

import component from 'components/not-found-page';

const notFoundPageRoute = () => (
  <Route
    key="notFoundPageRoute"
    component={component}
  />
);

export default notFoundPageRoute;
