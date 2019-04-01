import { createStandardAction as action, ActionType } from "typesafe-actions";
import { ActionTypes, IAccountState } from "./types";

/** Изменить имя пользователя */
export const setUser = action(ActionTypes.setUser)<IAccountState>();
/** Изменить статус пользователя */
export const setStatus = action(ActionTypes.setStatus)<string>();

export type TAccountActions = ActionType<typeof setUser> | ActionType<typeof setStatus>;
