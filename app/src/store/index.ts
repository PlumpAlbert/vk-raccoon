import { IAccountState } from "./account/types";
import { combineReducers, ReducersMapObject } from "redux";
import AccountReducer from "./account";
import ApplicationReducer from "./application";
import { IApplicationState } from "./application/types";

export interface IGlobalStore {
  app: IApplicationState;
  user: IAccountState;
}

export default combineReducers<IGlobalStore>({
  app: ApplicationReducer,
  user: AccountReducer
});
