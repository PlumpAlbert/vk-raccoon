import { Sex, Relation } from "../types";

export interface Relation_partner {
  id: number;
  first_name: string;
  last_name: string;
}

export interface Relation_request {
  id: number;
  first_name: string;
  last_name: string;
  is_closed: boolean;
  can_access_closed: boolean;
}

export interface Country {
  id: number;
  title: string;
}

export interface City {
  id: number;
  title: string;
}

export enum NameRequestStatus {
  processing = "processing",
  declined = "declined"
}

export interface NameRequest {
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
export interface profileInfoResponse {
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
  relation: Relation;
  /** Объект пользователя, с которым связано
   *  семейное положение (если есть) */
  relation_partner: Relation_partner;
  /** Передается 1, если пользователь,
   * указанный в relation_partner,
   * не подтвердил отношения */
  relation_pending: number;
  /** Список объектов пользователей,
   * которые указали, что состоят в отношениях
   * с данным пользователем (если есть) */
  relation_requests: Relation_request[];
  /** Дата рождения пользователя, возвращается
   * в формате D.M.YYYY */
  bdate: string;
  /** Видимость даты рождения */
  bdate_visibility: number;
  /** Название родного города */
  home_town: string;
  /** Страна */
  country: Country;
  /** Город */
  city: City;
  /** Информация о заявке на смену имени, если она была подана */
  name_request: NameRequest;
  /** Статус пользователя */
  status: string;
  /** Номер телефона */
  phone: string;
}
