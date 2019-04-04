import { IUser, NameCase } from "../objects";
import { apiGet, TMainParams } from "../types";

export interface IParams extends TMainParams {
  /** Список идентификаторов пользователей */
  users?: Array<number>;
  /** Список дополнительных полей профилей,
   * которые необходимо вернуть */
  fields?: TFields;
  /** Падеж для склонения имени и фамилии пользователей */
  name_case?: NameCase;
}

export interface IRequest {
  user_ids?: string;
  fields?: string;
  name_case?: string;
}

export type TFields = Array<keyof IUser>;

export type TResponse = IUser[];

export default (args: IParams) => {
  let request: IRequest = {};
  if (args.users && args.users.length > 0) {
    if (args.users.length > 1000) throw { error: "Максимальное количество пользователей - 1000" };
    request.user_ids = args.users.join(",");
  }
  if (args.fields && args.fields.length > 0) {
    request.fields = args.fields.join(",");
  }
  request.name_case = args.name_case;
  return apiGet<TResponse>("users.get", args.token, request);
};
