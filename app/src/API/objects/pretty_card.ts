export interface IPrettyCard {
  /** Идентификатор карточки */
  card_id: number;
  /** URL карточки */
  link_url: string;
  /** Подпись карточки */
  title: string;
  /** Изображения */
  images: Array<IImage>;
  /** Объект кнопки */
  button: object;
  /** Цена */
  price: string;
  /** Старая цена */
  price_old: string;
}

interface IImage {
  url: string;
  width: number;
  height: number;
}
