import { combineReducers } from "redux";
import auth from "./actions/auth/reducer.js";
import messages from "./actions/messages/reducer.js";

export default combineReducers({
  auth,
  messages
});
