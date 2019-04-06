import { NameCase, IUser } from "../objects";
import API from "..";
import { apiGet } from "../types";

export interface IResponse {
  /** Общее количество друзей  */
  count: number;
  /** Массив идентификаторов пользователей */
  items: IUser[];
}

export interface IParams {
  /** Идентификатор пользователя, для которого необходимо
   * получить список друзей */
  user_id?: number;
  /** Порядок, в котором нужно вернуть список
   ** По умолчанию - в порядке возрастания
   */
  order?: Order;
  /** Идентификатор списка друзей, из которого нужно получить друзей */
  list_id?: number;
  /** Количество друзей, которое необходимо вернуть */
  count?: number;
  /** Смещение, необходимое для выборки определенного подмножества друзей */
  offset?: number;
  /** Список дополнительных полей */
  fields: Array<keyof typeof IFields>;
  /** Падеж для склонения имени и фамилии пользователя */
  name_case?: NameCase;
}

export enum IFields {
  nickname,
  domain,
  sex,
  bdate,
  city,
  country,
  timezone,
  photo_50,
  photo_100,
  photo_200_orig,
  has_mobile,
  contacts,
  education,
  online,
  relation,
  last_seen,
  status,
  can_write_private_message,
  can_see_all_post,
  universities
}

export enum Order {
  /** Сортировать по рейтингу */
  hints = 'hints',
  /** Случайный порядок */
  random = 'random',
  /** Сначала друзья, у которых установлены мобильные приложения */
  mobile = 'mobile',
  /** Сортировать по имени */
  name = 'name'
}

export default (token: string, args: IParams) => {
  let request: any = args;
  if (args.fields) request.fields = args.fields.join(',');
  return apiGet<IResponse>('friends.get', token, request);
}
