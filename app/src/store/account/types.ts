export enum ActionTypes {
  /** Изменить имя пользователя */
  setUser = "@@account/SET_USER",
  /** Изменить статус пользователя */
  setStatus = "@@account/SET_STATUS"
}

export interface IAccountState {
  /** Идентификатор пользователя */
  id: number;
  /** Полное имя текущего пользователя */
  name: string;
  /** Имя текущего пользователя */
  short_name: string;
  /** Фотография пользователя 100x100 px */
  photo_100: string;
  /** Статус пользователя */
  status: string;
}
