import { RelationType, IUser, ICountry, ICity, Sex } from "../types/user";
import { TMainParams, apiGet } from "../types";

/** Отображение даты рождения */
export enum BirthDateVisibility {
  /** Не показывать */
  hide = 0,
  /** Показывать дату рождения */
  show_full = 1,
  /** Показывать только месяц и день */
  show = 2
}

/** Интерфейс описывающий пользователей, которые указали,
 *  что состоят в отношениях с текущим пользователем */
export interface IRelationRequest {
  /** Идентификатор пользователя */
  id: number;
  /** Имя пользователя */
  first_name: string;
  /** Фамилия пользователя */
  last_name: string;
  /**  */
  is_closed: boolean;
  can_access_closed: boolean;
}

/** Статус запроса на смену имени */
export enum NameRequestStatus {
  processing = "processing",
  declined = "declined"
}

/** Интерфейс запроса на смену имени */
export interface INameRequest {
  /** Идентификатор заявки, необходимый для её отмены
   * (только если status равен processing) */
  id: number;
  status: NameRequestStatus;
  /** Имя пользователя, указанное в заявке */
  first_name: string;
  /** Фамилия пользователя, указанная в заявке */
  last_name: string;
}

/** Объект, описывающий профиль пользователя */
export interface IResponse {
  /** Имя пользователя */
  first_name: string;
  /** Фамилия пользователя */
  last_name: string;
  /** Девичья фамилия (только для женского пола) */
  maiden_name: string;
  /** Короткое имя пользователя (если есть) */
  screen_name: string;
  /** Пол */
  sex: Sex;
  /** Семейное положение */
  relation: RelationType;
  /** Объект пользователя, с которым связано
   *  семейное положение (если есть) */
  relation_partner: IUser;
  /** Передается 1, если пользователь,
   * указанный в relation_partner,
   * не подтвердил отношения */
  relation_pending: number;
  /** Список объектов пользователей,
   * которые указали, что состоят в отношениях
   * с данным пользователем (если есть) */
  relation_requests: IRelationRequest[];
  /** Дата рождения пользователя, возвращается
   * в формате D.M.YYYY */
  bdate: string;
  /** Видимость даты рождения */
  bdate_visibility: BirthDateVisibility;
  /** Название родного города */
  home_town: string;
  /** Страна */
  country: ICountry;
  /** Город */
  city: ICity;
  /** Информация о заявке на смену имени, если она была подана */
  name_request: INameRequest;
  /** Статус пользователя */
  status: string;
  /** Номер телефона */
  phone: string;
}

export default (args: TMainParams) => apiGet<IResponse>("account.getProfileInfo", args.token);
