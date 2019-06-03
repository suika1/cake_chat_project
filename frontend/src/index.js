import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import App from './modules/app';

import history from './api/browserHistory';

import 'styles/index.css';

ReactDOM.render(
  <Router history={history}>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>,
  document.getElementById('root'),
);
