import { Reducer } from "redux";
import { ApplicationState, ActionTypes, Pages, Locale } from "./types";
import { TActions } from "./actions";

const initialState: ApplicationState = {
  activePage: Pages.Login,
  token: "",
  locale: Locale.en
};

const reducer: Reducer<ApplicationState, TActions> = (state = initialState, action): ApplicationState => {
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
