import { createStore, applyMiddleware } from "redux";
import defaultReducer from "../reducers/index";
import logger from "redux-logger";
import thunk from "redux-thunk";

export const store = createStore(
  defaultReducer,
  applyMiddleware(thunk, logger)
);
