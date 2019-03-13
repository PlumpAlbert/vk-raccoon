import { BirthDateVisibility } from "./../../API/account/getProfileInfo.type";
import { createStandardAction as action, ActionType } from "typesafe-actions";
import { ActionConstants, Sex, IRelation } from "./types";

/** Изменить имя пользователя */
export const setName = action(ActionConstants.changeName)<string>();
/** Изменить дату рождения пользователя */
export const setBDate = action(ActionConstants.setBirthDate)<Date>();
/** Изменить способ отображения даты рождения пользователя */
export const setBDateVisibility = action(ActionConstants.setBirthDateVisibility)<BirthDateVisibility>();
/** Изменить пол пользователя */
export const setSex = action(ActionConstants.changeSex)<Sex>();
/** Изменить семейное положение пользователя */
export const setRelation = action(ActionConstants.setRelation)<IRelation>();
/** Изменить название родного города пользователя */
export const setHometown = action(ActionConstants.setHomeTown)<string>();
/** Изменить название страны, в которой проживает пользователь */
export const setCountry = action(ActionConstants.setCountry)<string>();
/** Изменить название города, в котором проживает пользователь */
export const setCity = action(ActionConstants.setCity)<string>();
/** Изменить статус пользователя */
export const setStatus = action(ActionConstants.setStatus)<string>();
/** Изменить номер телефона пользователя */
export const setPhone = action(ActionConstants.setPhone)<string>();

export type TAccountActions =
  | ActionType<typeof setName>
  | ActionType<typeof setBDate>
  | ActionType<typeof setBDateVisibility>
  | ActionType<typeof setSex>
  | ActionType<typeof setRelation>
  | ActionType<typeof setHometown>
  | ActionType<typeof setCountry>
  | ActionType<typeof setCity>
  | ActionType<typeof setStatus>
  | ActionType<typeof setPhone>;
