import { TMainParams, apiGet } from "../types";
import { Filter, INews } from "./types";
import { IUser, IGroup } from "../objects";

export interface IParams extends TMainParams {
  /** перечисленные через запятую названия списков новостей,
   *  которые необходимо получить */
  filters?: Filter;
  /** включить в выдачу также скрытых из новостей пользователей */
  return_banned?: boolean;
  /** время в формате unixtime, начиная с которого следует получить
   *  новости для текущего пользователя */
  start_time?: Date;
  /** время в формате unixtime, до которого следует получить
   *  новости для текущего пользователя.
   **  Если параметр не задан, то он считается равным текущему времени */
  end_time?: Date;
  /** Максимальное количество фотографий,
   * информацию о которых необходимо вернуть.
   ** По умолчанию: 5
   ** Максимальное значение: 100 */
  max_photos?: number;
  /** иcточники новостей, новости от которых необходимо получить
   ** Если параметр не задан, то считается, что он включает список
      всех друзей и групп пользователя, за исключением скрытых источников
   */
  source_ids?: number[] | string;
  /** Идентификатор, необходимый для получения следующей страницы результатов
   ** Значение, необходимое для передачи в этом параметре, возвращается в поле ответа next_from
   */
  start_from?: string;
  /** указывает, какое максимальное число новостей следует возвращать, но не более 100.
   ** По умолчанию 50 */
  count?: number;
  /** список дополнительных полей для профилей и групп, которые необходимо вернуть */
  fields?: Array<keyof IUser | keyof IGroup>,
  section?: string;
}

export interface IResponse {
  items: INews[];
  profiles: IUser[];
  groups: IGroup[];
}

export default (args: IParams) => {
  let request: any = args;
  if (args.fields)
    request.fields = args.fields.join(',');
  if (args.source_ids && (args.source_ids as number[]).join)
    request.source_ids = (args.source_ids as number[]).join(',');
  if (args.start_time)
    request.start_time = Math.floor(args.start_time.valueOf() / 1000);
  if (args.end_time)
    request.end_time = Math.floor(args.end_time.valueOf() / 1000);
  request.return_banned = args.return_banned ? '1' : '0';
  return apiGet<IResponse>('newsfeed.get', args.token, request);
}
