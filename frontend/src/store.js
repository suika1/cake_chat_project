import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import history from 'api/browserHistory'

import defaultReducer from './rootReducer';

import createSagaMiddleWare from 'redux-saga';
import rootSaga from './rootSaga';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const sagaMiddleware = createSagaMiddleWare();

export const store = createStore(
  defaultReducer,
  composeEnhancers(applyMiddleware(routerMiddleware(history), sagaMiddleware)),
);

rootSaga.forEach(saga => sagaMiddleware.run(saga));
