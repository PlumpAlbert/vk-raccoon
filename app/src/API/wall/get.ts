import { IUser } from "../types/user";
import { IPost } from "../types/post";
import { TMainParams, apiGet } from "../types";

export interface IParams extends TMainParams {
  /** Идентификатор пользователя или сообщества,
   * со стены которого необходимо получить записи
   * (по умолчанию — текущий пользователь) */
  owner_id?: number;
  /** Короткий адрес пользователя или сообщества */
  domain?: string;
  /** Смещение, необходимое для выборки определенного подмножества записей */
  offset?: number;
  /** Количество записей, которое необходимо получить.
   * * Максимальное значение: 100. */
  count: number;
  /** Определяет, какие типы записей на стене необходимо получить */
  filter?: Filter;
  /** Если true, в ответе будут возвращены дополнительные поля
   *  profiles и groups, содержащие информацию о пользователях и сообществах */
  extended: boolean;
  /** Список дополнительных полей для профилей и сообществ, которые необходимо вернуть */
  fields?: Array<keyof IUser>;
}

export enum Filter {
  /** Предложенные записи на стене сообщества
   *  (доступно только при вызове с передачей access_token) */
  suggests = "suggests",
  /** Отложенные записи
   *  (доступно только при вызове с передачей access_token) */
  postponed = "postponed",
  /** Записи владельца стены */
  owner = "owner",
  /** Записи не от владельца стены */
  others = "others",
  /** Все записи на стене (owner + others) */
  all = "all"
}

export interface IResponse {
  /** Число результатов */
  count: number;
  /** Массив постов */
  items: Array<IPost>;
  /** Массив пользователей */
  profiles: Array<IUser>;
  /** Массив сообществ */
  groups: Array<object>;
}

export default (args: IParams) => {
  let request: any = args;
  if (args.fields)
    request.fields = args.fields.join(',');
  args.extended ? request.extended = "1" : "0";
  return apiGet<IResponse>("wall.get", args.token, request);
}
