import { createStore, applyMiddleware, compose } from "redux";
import defaultReducer from "../rootReducer";
import logger from "redux-logger";
import thunk from "redux-thunk";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  defaultReducer,
  composeEnhancers(
    applyMiddleware(thunk, logger)
  )
);
