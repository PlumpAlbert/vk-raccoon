export interface IAudio {
  /** Идентификатор аудиозаписи */
  id: number;
  /** Идентификатор владельца аудиозаписи */
  owner_id: number;
  /** Исполнитель */
  artist: string;
  /** Название композиции */
  title: string;
  /** Длительность аудиозаписи в секундах */
  duration: number;
  /** Ссылка на mp3 */
  url: string;
  /** Идентификатор текста аудиозаписи */
  lyrics_id?: number;
  /** Идентификатор альбома, в котором находится аудиозапись */
  album_id?: number;
  /** Идентификатор жанра */
  genre_id: AudioGenre;
  /** Дата добавления */
  date: number;
  /** Не выводить при поиске */
  no_search?: 1;
  /** Высокое качество */
  is_hq?: 1;
}

export enum AudioGenre {
  Rock = 1,
  Pop = 2,
  'Rap & Hip-Hop' = 3,
  'Easy Listening' = 4,
  'House & Dance' = 5,
  Instrumental = 6,
  Metal = 7,
  Alternative = 21,
  Dubstep = 8,
  'Jazz & Blues' = 1001,
  'Drum & Bass' = 10,
  Trance = 11,
  Chanson = 12,
  Ethnic = 13,
  'Acoustic & Vocal' = 14,
  Reggae = 15,
  Classical = 16,
  'Indie Pop' = 17,
  Speech = 19,
  'Electropop & Disco' = 22,
  Other = 18
}
