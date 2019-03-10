import { combineReducers } from "redux";
import AccountReducer from "./account";
import ApplicationReducer from "./application";

export default combineReducers({
  AccountReducer,
  ApplicationReducer
});
