import { IPost, IAttachment, IPhoto, ILikes } from "../objects";

export interface INews {
  /** Тип списка новости */
  type: Filter;
  /** Идентификатор источника новости
   **  положительный — новость пользователя
   **  отрицательный — новость группы */
  source_id: number;
  /** Время публикации новости в формате unixtime */
  date: number;
}

export interface IPostNews extends INews {
  type: Filter.post;
  /** содержит идентификатор записи на стене владельца */
  post_id: number;
  /** находится в записях со стен, содержит тип новости (post или copy) */
  post_type: 'post' | 'copy';
  /** передается в случае, если этот пост сделан при удалении */
  final_post?: boolean;
  /** находится в записях со стен, если сообщение является
   *  копией сообщения с чужой стены, и содержит идентификатор
   *  владельца стены, у которого было скопировано сообщение */
  copy_owner_id?: number;
  /** находится в записях со стен, если сообщение является
   *  копией сообщения с чужой стены, и содержит идентификатор
   *  скопированного сообщения на стене его владельца */
  copy_post_id?: number;
  /** массив, содержащий историю репостов для записи.
   *  Возвращается только в том случае, если запись является репостом.
   *  Каждый из объектов массива, в свою очередь, является объектом-записью
   *  стандартного формата */
  copy_history?: IPost[];
  /** находится в записях со стен, если сообщение является копией
   *  сообщения с чужой стены, и содержит дату скопированного сообщения */
  copy_post_date?: number;
  /** содержит текст записи */
  text: string;
  /** содержит 1, если текущий пользователь может редактировать запись */
  can_edit: boolean;
  /** возвращается, если пользователь может удалить новость, всегда содержит 1 */
  can_delete?: 1;
  /** содержит информацию о комментариях к записи */
  comments: {
    /** количество комментариев */
    count: number;
    /** может ли текущий пользователь комментировать запись */
    can_post: boolean;
  };
  /** содержит информацию о числе людей, которым понравилась данная запись */
  likes: ILikes;
  /** содержит информацию о числе людей, которые скопировали данную запись на свою страницу */
  reposts: {
    /** число пользователей, сделавших репост */
    count: number;
    /** наличие репоста от текущего пользователя */
    user_reposted: boolean;
  };
  /** содержит массив объектов, которые прикреплены к текущей новости (фотография, ссылка и т.п.) */
  attachments?: IAttachment[];
  /** информация о местоположении */
  geo?: {
    /** идентификатор места */
    place_id: number;
    /** название места */
    title: string;
    /** тип места */
    type: string;
    /** идентификатор страны */
    country_id: number;
    /** идентификатор города */
    city_id: number;
    /** строка с указанием адреса места в городе */
    address: string;
    /** данный параметр указывается, если местоположение является прикреплённой картой */
    showmap?: object;
  };
}

export interface IPhotoNews extends INews {
  type: Filter.photo;
  photos: {
    /** Количество новых фото */
    count: number;
    /** Последние 5 фото */
    items: IPics[];
  }
}

export interface IPhotoTagsNews extends INews {
  type: Filter.photo_tag;
  photo_tags: {
    count: number;
    items: IPics[];
  }
}

export interface INoteNews {
  type: Filter.note;
  notes: {
    count: number;
    items: Array<object & {
      /** идентификатор заметки */
      id: number;
      /** идентификатор владельца заметки */
      owner_id: number;
      /** заголовок заметки */
      title: string;
      /** количество комментариев к заметке */
      comments: number;
    }>
  }
}

export interface IFriendNews {
  type: Filter.friend;
  friends: {
    count: number;
    items: Array<{ user_id: number; }>
  }
}

export enum Filter {
  /** новые записи со стен */
  post = 'post',
  /** новые фотографии */
  photo = 'photo',
  /** новые отметки на фотографиях */
  photo_tag = 'photo_tag',
  /** новые фотографии на стенах */
  wall_photo = 'wall_photo',
  /** новые друзья */
  friend = 'friend',
  /** новые заметки */
  note = 'note',
  /** записи сообществ и друзей, содержащие аудиозаписи,
   *  а также новые аудиозаписи, добавленные ими */
  audio = 'audio',
  /** новые видеозаписи */
  video = 'video'
}

interface IPics extends IPhoto {
  /** идентификатор фотографии */
  id: number;
  /** идентификатор владельца фотографии */
  owner_id: number;
  /** идентификатор альбома */
  album_id: number;
  /** адрес изображения для предпросмотра */
  src: string;
  /** адрес полноразмерного изображения */
  src_big: string;
}
