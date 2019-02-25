import { combineReducers } from "redux";
import { MainState, MainReducer } from "./main";

export interface ApplicationState {
  mainState: MainState;
}

export const rootReducer = combineReducers<ApplicationState>({
  mainState: MainReducer
});
