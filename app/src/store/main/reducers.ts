import { Reducer } from "redux";
import { MainState, MainActionTypes, Pages } from "./types";
import { ActionType } from "typesafe-actions";
import * as Actions from "./actions";

const initialState: MainState = { activePage: Pages.Login, token: "" };

const reducer: Reducer<MainState, ActionType<typeof Actions>> = (state = initialState, action): MainState => {
  switch (action.type) {
    case MainActionTypes.CHANGE_PAGE:
      return { ...state, activePage: action.payload };
    case MainActionTypes.SET_TOKEN:
      return { ...state, token: action.payload };
    default:
      return initialState;
  }
};

export { reducer as MainReducer };
