export interface IConversation {
  /** Информация о собеседнике */
  peer: IPeer;
  /** Идентификатор последнего прочтенного входящего сообщения */
  in_read: number;
  /** Идентификатор последнего прочтенного исходящего сообщения */
  out_read: number;
  /** Число непрочитанных сообщений */
  unread_count: number;
  /** Диалог помечен как важный
   ** только для сообщений сообществ
  */
  important?: boolean;
  /** Диалог помечен как неотвеченный
   ** только для сообщений сообществ
  */
  unanswered?: boolean;
  /** Настройки Push-уведомлений */
  push_settings?: {
    /** Timestamp, до которого оповещения отключены */
    disabled_until: number;
    /** Передается в случае, если оповещения отключены навсегда, содержит true */
    disabled_forever?: true;
    /** Передается в случае, если отключен звук оповещений, содержит true */
    no_sound?: true;
  }
  /** Может ли пользователь писать в диалог */
  can_write: ICanWrite;
  /** Настройки беседы */
  chat_settings?: IChatSettings;
}

interface IPeer {
  /** Идентификатор назначения */
  id: number;
  /** Тип */
  type: string;
  /** Локальный идентификатор назначения */
  local_id: number;
}
export class UserPeer implements IPeer {
  id = 0;
  type = 'user';
  local_id = 0;
  constructor(id: number) {
    this.local_id = this.id = id;
  }
}
export class ChatPeer implements IPeer {
  id = 0;
  type = 'chat';
  local_id = 0;
  constructor(id: number) {
    this.id = id;
    this.local_id = id - 2000000000;
  }
}
export class GroupPeer implements IPeer {
  id = 0;
  type = 'group';
  local_id = 0;
  constructor(id: number) {
    this.id = id;
    this.local_id = -id;
  }
}
export class EmailPeer implements IPeer {
  id = 0;
  type = 'email';
  local_id = 0;
  constructor(id: number) {
    this.id = id;
    this.local_id = -(id + 2000000000);
  }
}

interface ICanWrite {
  allowed: boolean;
  reason: BlockedReason;
}
export enum BlockedReason {
  /** Пользователь заблокирован или удален */
  UserBlockedOrBanned = 18,
  /** Нельзя отправить сообщение пользователю, который в чёрном списке */
  UserBlackList = 900,
  /** Пользователь запретил сообщения от сообщества */
  UserBlockedGroup = 901,
  /** Пользователь запретил присылать ему сообщения с помощью настроек приватности */
  UserBlockedPrivacy = 902,
  /** В сообществе отключены сообщения */
  GroupMessagesOff = 915,
  /** В сообществе заблокированы сообщения */
  GroupMessagesBlocked = 916,
  /** Нет доступа к чату */
  ChatBlocked = 917,
  /** Нет доступа к e-mail */
  EmailBlocked = 918,
  /** Нет доступа к сообществу */
  GroupBlocked = 203
}

interface IChatSettings {
  /** Число участников */
  members_count: number;
  /** Название беседы */
  title: string;
  /** Закрепленное сообщение */
  pinned_message?: object;
  /** Статус текущего пользователя */
  state: ChatState;
  /** Изображение беседы */
  photo: IChatPhoto;
  /** Идентификаторы последних пользователей, писавших в чат */
  active_ids: number[];
  /** Является ли беседа каналом сообщества */
  is_group_channel: boolean;
  /** Идентификатор создателя чата */
  owner_id: number;
  acl: {
    /** Может ли текущий пользователь приглашать людей в беседу */
    can_invite: boolean,
    /** Может ли пользователь редактировать информацию о беседе */
    can_change_info: boolean,
    /** Может ли пользователь изменять прикрепленное сообщение */
    can_change_pin: boolean,
    /** Может ли пользователь назначать модераторов/администраторов беседы */
    can_promote_users: boolean,
    /** Может ли пользователь видеть ссылку для приглашения */
    can_see_invite_link: boolean,
    /** Может ли пользователь менять ссылку для приглашения */
    can_change_invite_link: boolean,
  }
}
enum ChatState {
  /** Состоит в чате */
  in = 'in',
  /** Исключен из чата */
  kicked = 'kicked',
  /** Покинул чат */
  left = 'left'
}
interface IChatPhoto {
  /** URL изображения 50x50px */
  photo_50: string;
  /** URL изображения 100x100px */
  photo_100: string;
  /** URL изображения 200x200px */
  photo_200: string;
}
