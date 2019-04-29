import { createStore, applyMiddleware, compose } from 'redux';
import defaultReducer from './rootReducer';
// import logger from 'redux-logger';
// import thunk from 'redux-thunk';

import createSagaMiddleWare from 'redux-saga';
import rootSaga from './rootSaga';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const sagaMiddleware = createSagaMiddleWare();

export const store = createStore(
  defaultReducer,
  composeEnhancers(applyMiddleware(sagaMiddleware)),
);

rootSaga.forEach(saga => sagaMiddleware.run(saga));
// sagaMiddleware.run(rootSaga)
