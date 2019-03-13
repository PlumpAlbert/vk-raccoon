import { TAccountActions } from "./actions";
import { Reducer } from "redux";
import { Sex, IHomeState, ActionConstants } from "./types";

const initState: IHomeState = {
  name: "",
  sex: Sex.undefined,
  status: ""
};

const reducer: Reducer<IHomeState, TAccountActions> = (state = initState, a) => {
  switch (a.type) {
    case ActionConstants.changeName:
      return { name: a.payload, ...state };
    case ActionConstants.changeSex:
      return { sex: a.payload, ...state };
    case ActionConstants.setBirthDate:
      return { birth_date: a.payload, ...state };
    case ActionConstants.setBirthDateVisibility:
      return { birth_date_visibility: a.payload, ...state };
    case ActionConstants.setCity:
      return { city: a.payload, ...state };
    case ActionConstants.setCountry:
      return { country: a.payload, ...state };
    case ActionConstants.setHomeTown:
      return { home_town: a.payload, ...state };
    case ActionConstants.setPhone:
      return { phone: a.payload, ...state };
    case ActionConstants.setRelation:
      return { relation: a.payload, ...state };
    case ActionConstants.setStatus:
      return { status: a.payload, ...state };
    default:
      return state;
  }
};

export default reducer;
