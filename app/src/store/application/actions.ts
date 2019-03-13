import { createStandardAction, ActionType } from "typesafe-actions";
import { ActionTypes, Pages, Locale } from "./types";

export const changePage = createStandardAction(ActionTypes.changePage)<Pages>();
export const setToken = createStandardAction(ActionTypes.setToken)<string>();
export const changeLocale = createStandardAction(ActionTypes.changeLocale)<Locale>();

export type TApplicationActions =
  | ActionType<typeof changePage>
  | ActionType<typeof setToken>
  | ActionType<typeof changeLocale>;
