import { TAccountActions } from "./actions";
import { Reducer } from "redux";
import { IAccountState, ActionTypes } from "./types";

export const initialState: IAccountState = {
  id: 0,
  name: "",
  short_name: "",
  photo_100: "",
  status: ""
};

const reducer: Reducer<IAccountState, TAccountActions> = (state = initialState, a) => {
  switch (a.type) {
    case ActionTypes.setUser:
      return a.payload;
    case ActionTypes.setStatus:
      return {...state, status: a.payload};
    default:
      return state;
  }
};

export default reducer;
