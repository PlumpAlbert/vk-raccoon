export enum ActionTypes {
  /** Изменить имя пользователя */
  setUser = "@@account/SET_USER",
  /** Изменить статус пользователя */
  setStatus = "@@account/SET_STATUS"
}

export interface IAccountState {
  /** Идентификатор пользователя */
  id: number;
  /** Имя текущего пользователя */
  name: string;
  /** Статус пользователя */
  status: string;
}
