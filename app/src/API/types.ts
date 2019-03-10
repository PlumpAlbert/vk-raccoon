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
