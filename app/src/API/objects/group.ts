export interface IGroup {
  /** Идентификатор сообщества */
  id: number;
  /** Название сообщества */
  name: string;
  /** Короткий адрес */
  screen_name: string;
  /** Приватность сообщества */
  is_closed: GroupPrivacy;
  /** Удалено или заблокировано сообщество */
  deactivated?: 'deleted' | 'banned';
  /** Является ли текущий пользователь руководителем */
  is_admin: boolean;
  /** Уровен полномочий текущего пользователя */
  admin_level: AdminLevel;
  /** Является ли текущий пользователь участником */
  is_member: boolean;
  /** Является ли текущий пользователь рекламодателем */
  is_advertiser: boolean;
  /** Идентификатор пользователя, который отправил приглашение в сообщество
   ** Поле возвращается только для метода groups.getInvites
  */
  invited_by?: number;
  /** Тип сообщества */
  type: 'group' | 'page' | 'event',
  /** URL главной фотографии с размером 50x50px */
  photo_50: string,
  /** URL главной фотографии с размером 50x50px */
  photo_100: string,
  /** URL главной фотографии в максимальном размере */
  photo_200: string
}

/** Доступ сообщества */
export enum GroupPrivacy {
  /** Открытая */
  open = 0,
  /** Закрытая */
  close = 1,
  /** Приватная */
  private = 2
}

/** Уровень полномочий */
export enum AdminLevel {
  /** Модератор */
  moderator = 1,
  /** Редактор */
  editor = 2,
  /** Администратор */
  admin = 3
}
