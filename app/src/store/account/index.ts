import { TAccountActions } from "./actions";
import { Reducer } from "redux";
import { IHomeState, ActionConstants } from "./types";

const initState: IHomeState = {
  id: 0,
  name: "",
  status: ""
};

const reducer: Reducer<IHomeState, TAccountActions> = (state = initState, a) => {
  switch (a.type) {
    case ActionConstants.setUser:
      let { name, id, status } = a.payload;
      return { id, name, status };
    case ActionConstants.setStatus:
      return { status: a.payload, ...state };
    default:
      return state;
  }
};

export default reducer;
