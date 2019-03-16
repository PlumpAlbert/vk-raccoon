/** Пол */
export enum Sex {
  /** Не указано */
  undefined = 0,
  /** Женский */
  female = 1,
  /** Мужской */
  male = 2
}

/** Тип семейного положения */
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

/** Тип девайса */
export enum Platform {
  MobileWeb = 1,
  iPhone = 2,
  iPad = 3,
  Android = 4,
  WindowsPhone = 5,
  WindowsApp = 6,
  Web = 7
}

/** Политические предпочтения */
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

/** Главное в людях */
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

/** Главное в жизни */
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

/** Отношение к чему-либо */
export enum Attitude {
  Undefined = 0,
  StrongOpposition = 1,
  Negative = 2,
  Compromise = 3,
  Neutral = 4,
  Positive = 5
}

/** Тип школьного заведения */
export enum SchoolType {
  "школа" = 0,
  "гимназия",
  "лицей",
  "школа-интернат",
  "школа вечерняя",
  "школа музыкальная",
  "школа спортивная",
  "школа художественная",
  "колледж",
  "профессиональный лицей",
  "техникум",
  "ПТУ",
  "училище",
  "школа искусств"
}

/** Интерфейс карьеры */
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

/** Интерфейс города */
export interface ICity {
  /** Идентификатор города, который можно использовать для получения
   * его названия с помощью метода database.getCitiesById */
  id: number;
  /** Название города */
  title: string;
}

/** Интерфейс контактов */
export interface IContacts {
  /** Номер мобильного телефона пользователя */
  mobile_phone: string;
  /** Дополнительный номер телефона пользователя */
  home_phone: string;
}

/** Интерфейс счетчиков пользователя */
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

/** Интерфейс страны */
export interface ICountry {
  /** Идентификатор страны, который можно использовать для получения
   * его названия с помощью метода database.getCountriesById */
  id: number;
  /** Название страны */
  title: string;
}

/** Интерфейс области выреза */
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

/** Интерфейс миниатюры изображения */
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

/** Интерфейс военной службы */
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

/** Интерфейс рода деятельности пользователя */
export interface IOccupation {
  /** Тип занятий */
  type: "work" | "school" | "university";
  /** Идентификатор школы/вуза/сообщества компании */
  id: number;
  /** Название школы/вуза/места работы */
  name: string;
}

/** Интерфейс персональных данных */
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

/** Интерфейс описывающий объект родственников */
export interface IRelative {
  /** Идентификатор пользователя */
  id?: number;
  /** Имя родственника (в том случае, если родственник
   *  не является пользователем ВКонтакте, в этом случае id не возвращается) */
  name: string;
  /** Тип родственной связи */
  type: "child" | "sibling" | "parent" | "grandparent" | "grandchild";
}

/** Возможные названия типа школьного заведения */
export type TSchoolStringType =
  | "школа"
  | "гимназия"
  | "лицей"
  | "школа-интернат"
  | "школа вечерняя"
  | "школа музыкальная"
  | "школа спортивная"
  | "школа художественная"
  | "колледж"
  | "профессиональный лицей"
  | "техникум"
  | "ПТУ"
  | "училище"
  | "школа искусств";

export interface ISchool {
  /** Идентификатор школы */
  id: number;
  /** Идентификатор страны, в которой расположена школа */
  country: number;
  /** Идентификатор города, в котором расположена школа */
  city: number;
  /** Наименование школы */
  name: string;
  /** Год начала обучения */
  year_from: number;
  /** Год окончания обучения */
  year_to: number;
  /** Год выпуска */
  year_graduated: number;
  /** Буква класса */
  class: string;
  /** Специализация */
  speciality: string;
  /** Идентификатор типа */
  type: SchoolType;
  /** Название типа */
  type_str: TSchoolStringType;
}

export interface IUniversity {
  /** Идентификатор университета */
  id: number;
  /** Идентификатор страны, в которой расположен ВУЗ */
  country: number;
  /** Идентификатор города, в котором расположен ВУЗ */
  city: number;
  /** Название ВУЗ */
  name: string;
  /** Идентификатор факультета */
  faculty: number;
  /** Наименование факультета */
  faculty_name: string;
  /** Идентификатор кафедры */
  chair: number;
  /** Название кафедры */
  chair_name: string;
  /** Год окончания обучения */
  graduation: number;
  /** Форма обучения */
  education_form: string;
  /** Статус (например, «Выпускник (специалист) ») */
  education_status: string;
}

export interface IRelation {
  type: RelationType;
  pending: number;
  partner: IUser;
  relation_requests: IUser;
}

/** Информация о композиции */
export interface IStatusAudio {
  id: number;
  owner_id: number;
  artist: string;
  title: string;
  duration: number;
  date: number;
  url: string;
  genre_id: number;
  is_hq: boolean;
  track_code: string;
  is_explicit: boolean;
}

/** Интерфейс пользователя */
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
  blacklisted?: boolean;
  /** Находится ли пользователь в черном списке текущего пользователя */
  blacklisted_by_me?: boolean;
  /** Содержимое поля "Любимые книги" из профиля */
  books?: string;
  /** Может ли текущий пользователь оставлять записи на стене */
  can_post?: boolean;
  /** Может ли текущий пользователь видеть чужие записи на стене */
  can_see_all_posts?: boolean;
  /** Может ли текущий пользователь видеть аудиозаписи */
  can_see_audio?: boolean;
  /** Будет ли отправлено уведомление пользователю о зявке
   * в друзья от текущего пользователя
   */
  can_send_friend_request?: boolean;
  /** Может ли текущий пользователь отправить личное сообщение */
  can_write_private_message?: boolean;
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
  has_mobile?: boolean;
  /** Установил ли пользователь фотографию для профиля */
  has_photo?: boolean;
  /** Название родного города */
  home_town?: string;
  /** Cодержимое поля «Интересы» из профиля */
  interests?: string;
  /** Есть ли пользователь в закладках у текущего пользователя */
  is_favorite?: boolean;
  /** Является ли пользователь другом текущего пользователя */
  is_friend?: boolean;
  /** Скрыт ли пользователь из ленты новостей текущего пользователя */
  is_hidden_from_feed?: boolean;
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
  online?: boolean;
  /** Использует ли пользователь мобильное приложение
   * либо мобильную версию */
  online_mobile?: 1;
  /** Использует ли пользователь мобильное приложение */
  online_app?: Platform;
  /** Информация о полях из раздела «Жизненная позиция» */
  personal?: IPersonalData;
  /** URL квадратной фотографии пользователя (50px) */
  photo_50?: string;
  /** URL квадратной фотографии пользователя (100px) */
  photo_100?: string;
  /** URL фотографии пользователя (200px) */
  photo_200_orig?: string;
  /** URL квадратной фотографии пользователя (200px) */
  photo_200?: string;
  /** URL фотографии пользователя (400px) */
  photo_400_orig?: string;
  /** Строковый идентификатор главной фотографии пользователя в формате {user_id}_{photo_id} */
  photo_id?: string;
  /** URL квадратной фотографии с максимальной шириной.
   *  Может быть возвращена фотография, имеющая ширину как 200, так и 100 пикселей. */
  photo_max?: string;
  /** URL фотографии максимального размера.
   *  Может быть возвращена фотография, имеющая ширину как 400, так и 200 пикселей. */
  photo_max_orig?: string;
  /** Любимые цитаты пользователя */
  quotes?: string;
  /** Список родственников пользователя */
  relatives?: Array<IRelative>;
  /** Семейное положение пользователя */
  relation?: IRelation;
  /** Список школ, в которых учился пользователь */
  schools?: Array<ISchool>;
  /** Короткое имя страницы */
  screen_name?: string;
  /** Пол пользователя */
  sex?: Sex;
  /** Адрес сайта,указанный в профиле */
  site?: string;
  /** Статус пользователя */
  status?: string;
  /** Если включена опция «Транслировать в статус играющую музыку»,
   *  возвращается объект, содержащий информацию о композиции */
  status_audio?: IStatusAudio;
  /** Временная зона.
   * Только при запросе информации о текущем пользователе */
  timezone?: number;
  /** Информация о том,есть ли на странице пользователя "огонёк" */
  trending?: boolean;
  /** Любимые телешоу */
  tv?: string;
  /** Список вузов, в которых обучался пользователь */
  universities?: Array<IUniversity>;
  /** Верифицирован ли пользователь */
  verified?: boolean;
  /** Режим стены по умолчанию */
  wall_default?: "owner" | "all";
  //#endregion
}
