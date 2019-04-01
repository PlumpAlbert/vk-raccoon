import { Reducer } from "redux";
import { IApplicationState, ActionTypes, Pages, Locale } from "./types";
import { TApplicationActions } from "./actions";

export const initialState: IApplicationState = {
  activePage: Pages.Login,
  token: "",
  locale: Locale.en
};

const reducer: Reducer<IApplicationState, TApplicationActions> = (state = initialState, action): IApplicationState => {
  switch (action.type) {
    case ActionTypes.changePage:
      return { ...state, activePage: action.payload };
    case ActionTypes.setToken:
      return { ...state, token: action.payload };
    case ActionTypes.changeLocale:
      return { ...state, locale: action.payload };
    default:
      return state;
  }
};

export default reducer;
