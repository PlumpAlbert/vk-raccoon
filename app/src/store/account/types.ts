import { BirthDateVisibility, RelationRequest } from "../../API/account/getProfileInfo.type";

export enum Sex {
  /** Не указано */
  undefined = 0,
  /** Женский */
  female = 1,
  /** Мужской */
  male = 2
}

export enum Relation {
  /** Не указано */
  undefined = 0,
  /** Не женат / Не замужем */
  single = 1,
  /** Есть друг/подруга */
  _ = 2,
  /** Помолвлен(а) */
  engaged = 3,
  /** Женат / Замужем */
  married = 4,
  /** Все сложно */
  complicated = 5,
  /** В активном поиске */
  searching = 6,
  /** Влюблен(а) */
  inLove = 7,
  /** В гражданском браке */
  civilMarriage = 8
}

export interface IUser {
  /** Идентификатор пользователя */
  id: number;
  /** Имя пользователя */
  first_name: string;
  /** Фамилия пользователя */
  last_name: string;
  /** Поле возвращается, если страница
   * пользователя удалена или заблокирована */
  deactivated?: "deleted" | "banned";
  /** Скрыт ли профиль пользователя настройками приватности */
  is_closed?: boolean;
  /** Может ли текущий пользователь видеть профиль
   *  при is_closed = 1 (например, он есть в друзьях) */
  can_access_closed?: boolean;
}

export interface IHomeState {
  /** Имя текущего пользователя */
  name: string;
  /** Дата рождения пользователя */
  birth_date?: Date;
  /** Отображение даты рождения */
  birth_date_visibility?: BirthDateVisibility;
  /** Пол пользователя */
  sex: Sex;
  /** Семейное положение */
  relation?: {
    type: Relation;
    pending: number;
    partner: IUser;
    relation_requests: RelationRequest;
  };
  /** Родной город */
  home_town?: string;
  /** Страна */
  country?: string;
  /** Город */
  city?: string;
  /** Статус пользователя */
  status: string;
  /** Номер телефона */
  phone?: string;
}

export interface IActions {}
