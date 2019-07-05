import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import history from 'api/browserHistory'
import { composeWithDevTools, actionCreators } from 'redux-devtools-extension';

import defaultReducer from './rootReducer';

import createSagaMiddleWare from 'redux-saga';
import rootSaga from './rootSaga';

const composeEnhancers = composeWithDevTools({ actionCreators, trace: true, traceLimit: 10 });

const sagaMiddleware = createSagaMiddleWare();

export const store = createStore(
  defaultReducer,
  composeEnhancers(applyMiddleware(routerMiddleware(history), sagaMiddleware)),
);

rootSaga.forEach(saga => sagaMiddleware.run(saga));
