export interface IPhoto {
  /** Идентификатор фотографии */
  id: number;
  /** Идентификатор альбома, в котором находится фотография */
  album_id: number;
  /** Идентификатор владельца фотографии */
  owner_id: number;
  /** Идентификатор пользователя, загрузившего фото
   * (если фотография размещена в сообществе).
   ** Для фотографий, размещенных от имени сообщества, user_id = 100 */
  user_id: number;
  /** Текст описания фотографии */
  text: string;
  /** Дата добавления в формате Unixtime */
  date: number;
  /** Массив с копиями изображения в разных размерах */
  sizes: Array<ISize>;
  /** Ширина оригинала фотографии в пикселях */
  width?: number;
  /** Высота оригинала фотографии в пикселях */
  height?: number;
}

export interface ISize {
  /** Тип копии */
  type: SizeType;
  /** URL оригинала */
  url: string;
  /** Ширина в px */
  width: number;
  /** Высота в px */
  height: number;
}

export enum SizeType {
  /** Пропорциональная копия изображения с максимальной стороной 75px */
  s = 's',
  /** Пропорциональная копия изображения с максимальной стороной 130px */
  m = 'm',
  /** Пропорциональная копия изображения с максимальной стороной 604px */
  x = 'x',
  /** Если соотношение "ширина/высота" исходного изображения меньше или
   *  равно 3:2, то пропорциональная копия с максимальной шириной 130px.
   *  Если соотношение "ширина/высота" больше 3:2, то копия обрезанного
   *  слева изображения с максимальной шириной 130px и соотношением
   *  сторон 3:2 */
  o = 'o',
  /** Если соотношение "ширина/высота" исходного изображения меньше или
   *  равно 3:2, то пропорциональная копия с максимальной шириной 200px.
   *  Если соотношение "ширина/высота" больше 3:2, то копия обрезанного
   *  слева и справа изображения с максимальной шириной 200px и
   *  соотношением сторон 3:2 */
  p = 'p',
  /** Если соотношение "ширина/высота" исходного изображения меньше или
   *  равно 3:2, то пропорциональная копия с максимальной шириной 320px.
   *  Если соотношение "ширина/высота" больше 3:2, то копия обрезанного
   *  слева и справа изображения с максимальной шириной 320px и
   *  соотношением сторон 3:2 */
  q = 'q',
  /** Если соотношение "ширина/высота" исходного изображения меньше или
   *  равно 3:2, то пропорциональная копия с максимальной шириной 510px.
   *  Если соотношение "ширина/высота" больше 3:2, то копия обрезанного
   *  слева и справа изображения с максимальной шириной 510px и
   *  соотношением сторон 3:2 */
  r = 'r',
  /** Пропорциональная копия изображения с максимальной стороной 807px */
  y = 'y',
  /** Пропорциональная копия изображения с максимальным размером 1080x1024 */
  z = 'z',
  /** Пропорциональная копия изображения с максимальным размером 2560x2048px */
  w = 'w'
}