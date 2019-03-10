import { Reducer } from "redux";
import { Sex, Relation, IUser, IHomeState } from "./types";
import { RelationRequest, BirthDateVisibility } from "../../API/account/getProfileInfo.type";

const initState: IHomeState = {
  name: "",
  sex: Sex.undefined,
  status: ""
};
const reducer: Reducer<IHomeState> = (state = initState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default reducer;
