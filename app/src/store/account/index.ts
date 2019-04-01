import { TAccountActions } from "./actions";
import { Reducer } from "redux";
import { IAccountState, ActionTypes } from "./types";

export const initialState: IAccountState = {
  id: 0,
  name: "",
  status: ""
};

const reducer: Reducer<IAccountState, TAccountActions> = (state = initialState, a) => {
  switch (a.type) {
    case ActionTypes.setUser:
      let { name, id, status } = a.payload;
      return { id, name, status };
    case ActionTypes.setStatus:
      return { ...state, status: a.payload };
    default:
      return state;
  }
};

export default reducer;
