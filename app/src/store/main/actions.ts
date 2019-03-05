import { createStandardAction, ActionType } from "typesafe-actions";
import { MainActionTypes, Pages } from "./types";

export const changePage = createStandardAction(MainActionTypes.CHANGE_PAGE)<Pages>();
export const setToken = createStandardAction(MainActionTypes.SET_TOKEN)<string>();

export type TActions = ActionType<typeof changePage> | ActionType<typeof setToken>;
