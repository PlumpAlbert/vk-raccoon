import { createStandardAction as action, ActionType } from "typesafe-actions";
import { ActionConstants, IHomeState } from "./types";

/** Изменить имя пользователя */
export const setUser = action(ActionConstants.setUser)<IHomeState>();
/** Изменить статус пользователя */
export const setStatus = action(ActionConstants.setStatus)<string>();

export type TAccountActions = ActionType<typeof setUser> | ActionType<typeof setStatus>;
