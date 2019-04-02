import { Platform } from "./user";

/** Интерфейс, описывающий запись на стене пользователя или сообщества */
export interface IPost {
  /** Идентификатор записи */
  id: number;
  /** Идентификатор владельца стены, на которой размещена запись */
  owner_id: number;
  /** Идентификатор автора записи (от чьего имени опубликована запись) */
  from_id: number;
  /** Идентификатор администратора, который опубликовал запись
   *  (возвращается только для сообществ при запросе с ключом доступа администратора) */
  created_by?: number;
  /** Время публикации записи в формате unixtime */
  date: number;
  /** Текст записи */
  text: string;
  /** Идентификатор владельца записи, в ответ на которую была оставлена текущая */
  reply_owner_id?: number;
  /** Идентификатор записи, в ответ на которую была оставлена текущая */
  reply_post_id?: number;
  /** Запись была создана с опцией «Только для друзей» */
  friends_only?: boolean;
  /** Информация о комментариях к записи */
  comments: IComments;
  /** Информация о лайках к записи, объект с полями */
  likes: ILikes;
  /** Информация о репостах записи («Рассказать друзьям») */
  reposts: IReposts;
  /** Информация о просмотрах записи */
  views: { count: number; }
  /** Тип записи */
  post_type: PostType;
  /** Информация о способе размещения записи */
  post_source?: IPostSource;
  /** Медиавложения записи (фотографии, ссылки и т.п.) */
  attachments?: Array<object>;
  /** Информация о местоположении */
  geo?: IGeo;
  /** Идентификатор автора, если запись была опубликована от имени сообщества
   *  и подписана пользователем */
  signer_id?: number;
  /** Массив, содержащий историю репостов для записи.
   *  Возвращается только в том случае, если запись является репостом */
  copy_history?: Array<IPost>;
  /** Может ли текущий пользователь закрепить запись  */
  can_pin?: boolean;
  /** Может ли текущий пользователь удалить запись */
  can_delete?: boolean;
  /** Может ли текущий пользователь редактировать запись */
  can_edit?: boolean;
  /** Информация о том, что запись закреплена */
  is_pinned?: boolean;
  /** Информация о том, содержит ли запись отметку "реклама" */
  marked_as_ads?: boolean;
  /** Пост добавлен в закладки у текущего пользователя */
  is_favorite: boolean;
}

/** Информация о комментариях к записи */
export interface IComments {
  /** Количество комментариев */
  count: number;
  /** Может ли текущий пользователь комментировать запись */
  can_post: boolean;
  /** Могут ли сообщества комментировать запись */
  groups_can_post: boolean;
  /** Может ли текущий пользователь закрыть комментарии к записи */
  can_close?: boolean;
  /** Может ли текущий пользователь открыть комментарии к записи */
  can_open?: boolean;
}

/** Информация о лайках к записи */
export interface ILikes {
  /** Число пользователей, которым понравилась запись */
  count: number;
  /** Наличие отметки «Мне нравится» от текущего пользователя */
  user_likes: boolean;
  /** Может ли текущий пользователь поставить отметку «Мне нравится» */
  can_like: boolean;
  /** Может ли текущий пользователь сделать репост записи */
  can_publish: boolean;
}

/** Информация о репостах записи */
export interface IReposts {
  /** Число пользователей, скопировавших запись */
  count: number;
  /** Наличие репоста от текущего пользователя */
  user_reposted: boolean;
}

export enum PostType {
  post = "post",
  copy = "copy",
  reply = "reply",
  postpone = "postpone",
  suggest = "suggest"
}

export interface IPostSource {
  /** Тип источника */
  type: PostSourceType;
  /** Название платформы (если доступно) */
  platform?: Platform.Android | Platform.iPhone | Platform.WindowsPhone;
  /** Тип действия (только для type= vk | widget) */
  data?: PostSourceData;
  /** URL ресурса, с которого была опубликована запись */
  url?: string;
}

export enum PostSourceType {
  /** Через основной интерфейс сайта */
  vk = "vk",
  /** Через виджет на стороннем сайте */
  widget = "widget",
  /** Приложением через API */
  api = "api",
  /** Посредством импорта RSS-ленты со стороннего сайта */
  rss = "rss",
  /** Посредством отправки SMS-сообщения */
  sms = "sms"
}

export enum PostSourceData {
  /** Изменение статуса (type = vk) */
  profile_activity = "profile_activity",
  /** Изменение профильной фотографии пользователя (type = vk) */
  profile_photo = "profile_photo",
  /** Виджет комментариев (type = widget) */
  comments = "comments",
  /** Виджет "Мне нравится" (type = widget) */
  like = "like",
  /** Виджет опросов (type = widget) */
  poll = "poll"
}

export interface IGeo {
  /** Тип места */
  type: string;
  /** Координаты места */
  coordinates: string;
  /** Описание места (если оно добавлено) */
  place?: IPlace;
}

export interface IPlace {
  /** Идентификатор места */
  id: number;
  /** Название места */
  title: string;
  /** Географическая широта, заданная в градусах (от -90 до 90) */
  latitude: number;
  /** Географическая долгота, заданная в градусах (от -90 до 90) */
  longitude: number;
  /** Дата создания места в Unixtime */
  created: number;
  /** Иконка места, URL изображения */
  icon: string;
  /** Число отметок в этом месте */
  checkins: number;
  /** Дата обновления места в Unixtime */
  updated: number;
  /** Тип места */
  type: number;
  /** Идентификатор страны */
  country: number;
  /** Идентификатор города */
  city: number;
  /** Адрес места */
  address: string;
}
