import { ICity } from "./types";
import { BirthDateVisibility, RelationRequest } from "../../API/account/getProfileInfo.type";

export type Bool = 0 | 1;

export enum Sex {
  /** Не указано */
  undefined = 0,
  /** Женский */
  female = 1,
  /** Мужской */
  male = 2
}

export interface IRelation {
  type: RelationType;
  pending: number;
  partner: IUser;
  relation_requests: RelationRequest;
}

export enum RelationType {
  /** Не указано */
  undefined = 0,
  /** Не женат / Не замужем */
  single = 1,
  /** Есть друг/подруга */
  haveFriend = 2,
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

export interface ICareer {
  /** Идентификатор сообщества (если доступно, иначе company) */
  group_id: number;
  /** Название компании (если доступно, иначе group_id) */
  company: string;
  /** Идентификатор страны */
  country_id: number;
  /** Идентификатор города (если доступно, иначе city_name) */
  city_id: number;
  /** Название города (если доступно, иначе city_id) */
  city_name: string;
  /** Год начала работы */
  from: number;
  /** Год окончания работы */
  until: number;
  /** Должность */
  position: string;
}

export interface ICity {
  /** Идентификатор города, который можно использовать для получения
   * его названия с помощью метода database.getCitiesById */
  id: number;
  /** Название города */
  title: string;
}

export interface IContacts {
  /** Номер мобильного телефона пользователя */
  mobile_phone: string;
  /** Дополнительный номер телефона пользователя */
  home_phone: string;
}

export interface ICounters {
  /** Количество фотоальбомов */
  albums: number;
  /** Количество видеозаписей */
  videos: number;
  /** Количество аудиозаписей */
  audios: number;
  /** Количество фотографий */
  photos: number;
  /** Количество заметок */
  notes: number;
  /** Количество друзей */
  friends: number;
  /** Количество сообществ */
  groups: number;
  /** Количество друзей онлайн */
  online_friends: number;
  /** Количество общих друзей */
  mutual_friends: number;
  /** Количество видеозаписей с пользователем */
  user_videos: number;
  /** Количество подписчиков */
  followers: number;
  /** Количество объектов в блоке "Интересные страницы" */
  pages: number;
}

export interface ICountry {
  /** Идентификатор страны, который можно использовать для получения
   * его названия с помощью метода database.getCountriesById */
  id: number;
  /** Название страны */
  title: string;
}

export interface ICrop {
  /** Кордината X левого верхнего угла в процентах */
  x: number;
  /** Кордината Y левого верхнего угла в процентах */
  y: number;
  /** Кордината X правого нижнего угла в процентах */
  x2: number;
  /** Кордината Y правого нижнего угла в процентах */
  y2: number;
}

export interface ICroppedPhoto {
  /**
   * Объект фотографии пользователя,
   * из которой вырезается главное фото профиля
   * TODO: add IPhoto interface
   */
  photo: object;
  /** Вырезанная фотография пользователя */
  crop: ICrop;
  rect: ICrop;
}

export interface IMilitary {
  /** Номер части */
  unit: string;
  /** Идентификатор части */
  unit_id: number;
  /** Идентификатор страны, в которой находится часть */
  country_id: number;
  /** Год начала службы */
  from: number;
  /** Год окончания службы */
  until: number;
}

export interface IOccupation {
  /** Тип занятий */
  type: "work" | "school" | "university";
  /** Идентификатор школы/вуза/сообщества компании */
  id: number;
  /** Название школы/вуза/места работы */
  name: string;
}

export enum Political {
  Undefined = 0,
  Communist = 1,
  Socialist = 2,
  Moderate = 3,
  Liberalist = 4,
  Conservative = 5,
  Monarch = 6,
  UltraConservative = 7,
  Indifferent = 8,
  Libertarian = 9
}

export enum PeopleMain {
  Undefined = 0,
  /** Ум и креативность */
  BrainCreativity = 1,
  /** Доброта и честность */
  KindnessHonesty = 2,
  /** Красота и здоровье */
  BeautyHealth = 3,
  /** Власть и богатство */
  PowerWealth = 4,
  /** Смелость и упорство */
  CouragePerseverance = 5,
  /** Юмор и жизнелюбие */
  HumorOptimism = 6
}

export enum LifeMain {
  Undefined = 0,
  /** Семья и дети */
  Family = 1,
  /** Карьера и деньги */
  Career = 2,
  /** Развлечения и отдых */
  Entertainment = 3,
  /** Наука и исследования */
  Science = 4,
  /** Совершенствование мира */
  WorldImprovement = 5,
  /** Саморазвитие */
  SelfDevelopment = 6,
  /** Красота и искусство */
  Art = 7,
  /** Слава и влияние */
  Glory = 8
}

export enum Attitude {
  Undefined = 0,
  StrongOpposition = 1,
  Negative = 2,
  Compromise = 3,
  Neutral = 4,
  Positive = 5
}

export interface IPersonalData {
  /** Политические предпочтения */
  political: Political;
  /** Языки */
  langs: Array<string>;
  /** Мировоззрение */
  religion: string;
  /** Источники вдохновения */
  inspired_by: string;
  /** Главное в людях */
  people_main: PeopleMain;
  /** Главное в жизни */
  life_main: LifeMain;
  /** Отношение к курению */
  smoking: Attitude;
  /** Отношение к алкоголю */
  alcohol: Attitude;
}

export interface IUser {
  //#region Обязательные поля
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
  is_closed: boolean;
  /** Может ли текущий пользователь видеть профиль
   *  при is_closed = 1 (например, он есть в друзьях) */
  can_access_closed: boolean;
  //#endregion

  //#region Необязательные поля
  /** Содержимое поля "О себе" из профиля */
  about?: string;
  /** Содержимое поля "Деятельность" из профиля */
  activities?: string;
  /** Дата рождения в формате D.M.YYYY или D.M */
  bdate?: string;
  /** Находится ли текущий пользователь в черном списке */
  blacklisted?: Bool;
  /** Находится ли пользователь в черном списке текущего пользователя */
  blacklisted_by_me?: Bool;
  /** Содержимое поля "Любимые книги" из профиля */
  books?: string;
  /** Может ли текущий пользователь оставлять записи на стене */
  can_post?: Bool;
  /** Может ли текущий пользователь видеть чужие записи на стене */
  can_see_all_posts?: Bool;
  /** Может ли текущий пользователь видеть аудиозаписи */
  can_see_audio?: Bool;
  /** Будет ли отправлено уведомление пользователю о зявке
   * в друзья от текущего пользователя
   */
  can_send_friend_request?: Bool;
  /** Может ли текущий пользователь отправить личное сообщение */
  can_write_private_message?: Bool;
  /** Информация о карьере пользователя */
  career?: ICareer;
  /** Информация о городе, указанном на странице пользователя
   * в разделе «Контакты» */
  city?: ICity;
  /** Количество общих друзей с текущим пользователем */
  common_count?: number;
  /** Имя пользователя в Skype */
  skype?: string;
  /** Имя пользователя в Facebook */
  facebook?: string;
  /** Имя пользователя в Twitter */
  twitter?: string;
  /** Имя пользователя в LiveJournal */
  livejournal?: string;
  /** Имя пользователя в Instagram */
  instagram?: string;
  contacts?: IContacts;
  /** Количество различных объектов у пользователя */
  counters?: ICounters;
  /** Информация о стране, указанной на странице пользователя
   * в разделе "Контакты" */
  country?: ICountry;
  /** Возвращает данные о точках, по которым вырезаны профильная
   * и миниатюрная фотографии пользователя, при наличии. */
  crop_photo?: ICroppedPhoto;
  /** Короткий адрес страницы. Если он не назначен, то возвращается "id"+user_id */
  domain?: string;
  /** Идентификатор университета */
  university?: number;
  /** Название университета */
  university_name?: string;
  /** Идентификатор факультета */
  faculty?: number;
  /** Название факультета */
  faculty_name?: string;
  /** Год выпуска */
  graduation?: number;
  /** Количество подписчиков пользователя */
  followers_count?: number;
  /** Статус дружбы с текущим пользователем */
  friend_status?: FriendStatus;
  /** Содержимое поля "Любимые игры" из профиля */
  games?: string;
  /** Известен ли номер мобильного телефона пользователя */
  has_mobile?: Bool;
  /** Установил ли пользователь фотографию для профиля */
  has_photo?: Bool;
  /** Название родного города */
  home_town?: string;
  /** Cодержимое поля «Интересы» из профиля */
  interests?: string;
  /** Есть ли пользователь в закладках у текущего пользователя */
  is_favorite?: Bool;
  /** Является ли пользователь другом текущего пользователя */
  is_friend?: Bool;
  /** Скрыт ли пользователь из ленты новостей текущего пользователя */
  is_hidden_from_feed?: Bool;
  /** Время последнего посещения */
  last_seen?: {
    /** Время последнего посещения в формате Unixtime */
    time: number;
    /** Тип платформы */
    platform: Platform;
  };
  /** Разделенные запятой идентификаторы списков друзей,в которых состоит пользователь.
   * * Доступно только для метода friends.get
   */
  lists?: string;
  /** Девичья фамилия */
  maiden_name?: string;
  /** Информация о военной службе пользователя */
  military?: IMilitary;
  /** Содержимое поля «Любимые фильмы» из профиля пользователя */
  movies?: string;
  /** Содержимое поля «Любимая музыка» из профиля пользователя */
  music?: string;
  /** Никнейм / отчество пользователя */
  nickname?: string;
  /** Информация о текущем роде занятия пользователя */
  occupation?: IOccupation;
  /** Находится ли пользователь сейчас на сайте */
  online?: Bool;
  /** Использует ли пользователь мобильное приложение
   * либо мобильную версию */
  online_mobile?: 1;
  /** Использует ли пользователь мобильное приложение */
  online_app?: Platform;
  /** Информация о полях из раздела «Жизненная позиция» */
  personal?: IPersonalData;
  //#endregion
}

/** Падежи */
export enum NameCase {
  /** Именительный */
  nom = "nom",
  /** Родительный */
  gen = "gen",
  /** Дательный */
  dat = "dat",
  /** Винительный */
  acc = "acc",
  /** Творительный */
  ins = "ins",
  /** Предложный */
  abl = "abl"
}

/** Статус дружбы */
export enum FriendStatus {
  /** Не является другом */
  NotFriends = 0,
  /** Исходящий запрос на дружбу */
  OutRequest = 1,
  /** Входящий запрос на дружбу */
  InRequest = 2,
  /** Является другом */
  Friend = 3
}

export enum Platform {
  MobileWeb = 1,
  iPhone = 2,
  iPad = 3,
  Android = 4,
  WindowsPhone = 5,
  WindowsApp = 6,
  Web = 7
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
  relation?: IRelation;
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

export enum ActionConstants {
  /** Изменить имя пользователя */
  changeName = "@@account/CHANGE_NAME",
  /** Изменить дату рождения пользователя */
  setBirthDate = "@@account/SET_BDATE",
  /** Изменить способ отображения даты рождения пользователя */
  setBirthDateVisibility = "@@account/SET_BDATE_VISIBILITY",
  /** Изменить пол пользователя */
  changeSex = "@@account/CHANGE_SEX",
  /** Изменить семейное положение пользователя */
  setRelation = "@@account/SET_RELATION",
  /** Изменить название родного города пользователя */
  setHomeTown = "@@account/SET_HOMETOWN",
  /** Изменить название страны, в которой проживает пользователь */
  setCountry = "@@account/SET_COUNTRY",
  /** Изменить название города, в котором проживает пользователь */
  setCity = "@@account/SET_CITY",
  /** Изменить статус пользователя */
  setStatus = "@@account/SET_STATUS",
  /** Изменить номер телефона пользователя */
  setPhone = "@@account/SET_PHONE"
}
