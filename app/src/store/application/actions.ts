import { Locale } from "./types";
import { createStandardAction, ActionType } from "typesafe-actions";
import { ActionTypes, Pages } from "./types";

export const changePage = createStandardAction(ActionTypes.changePage)<Pages>();
export const setToken = createStandardAction(ActionTypes.setToken)<string>();
export const changeLocale = createStandardAction(ActionTypes.changeLocale)<Locale>();

export type TActions = ActionType<typeof changePage> | ActionType<typeof setToken> | ActionType<typeof changeLocale>;
