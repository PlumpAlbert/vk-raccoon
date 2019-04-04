export interface IVideo {
  /** Идентификатор видеозаписи */
  id: number;
  /** Идентификатор владельца видеозаписи */
  owner_id: number;
  /** Название видеозаписи */
  title: string;
  /** Текст описания видеозаписи */
  description: string;
  /** URL изображения-обложки ролика с размером 130x98 px */
  photo_130: string;
  /** URL изображения-обложки ролика с размером 320x240 px */
  photo_320: string;
  /** URL изображения-обложки ролика с размером 640x480 px */
  photo_640?: string;
  /** URL изображения-обложки ролика с размером 800x450 px */
  photo_800?: string;
  /** URL изображения-обложки ролика с шириной до 1280 px */
  photo_1280?: string;
  /** URL изображения первого кадра ролика с размером 130x98 px */
  first_frame_130: string;
  /** URL изображения первого кадра ролика с размером 320x240 px */
  first_frame_320: string;
  /** URL изображения первого кадра ролика с размером 640x480 px */
  first_frame_640?: string;
  /** URL изображения первого кадра ролика с размером 800x450 px */
  first_frame_800?: string;
  /** URL изображения первого кадра ролика с шириной до 1280 px */
  first_frame_1280?: string;
  /** Дата создания видеозаписи в формате Unixtime */
  date: number;
  /** Дата добавления видеозаписи пользователем
   *  или группой в формате Unixtime */
  adding_date: number;
  /** Количество просмотров видеозаписи */
  views: number;
  /** Количество комментариев к видеозаписи */
  comments: number;
  /** URL страницы с плеером, который можно использовать
   *  для воспроизведения ролика в браузере.
   **  Поддерживается flash и html5, плеер всегда масштабируется
   *  по размеру окна. */
  player: string;
  /** Название платформы (для видеозаписей, добавленных с внешних сайтов)*/
  platform?: string;
  /** Может ли пользователь редактировать видеозапись */
  can_edit?: 1;
  /** Может ли пользователь добавить видеозапись к себе */
  can_add: boolean;
  /** Приватная видеозапись (например, в личном сообщении) */
  is_private?: 1;
  /** Ключ доступа к объекту */
  access_key?: string;
  /** Видеозапись находится в процессе обработки */
  processing?: 1;
  /** Прямая трансляция */
  live?: 1;
  /** Трансляция скоро начнется
   ** Для live = 1
   */
  upcoming?: 1;
  /** Объект добавлен в закладки у текущего пользователя */
  is_favorite: boolean;
}
