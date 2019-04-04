import { IPhoto } from "./photo";
import { IPrettyCard } from "./pretty_card";
import { IAudio } from "./audio";
import { IVideo } from "./video";

export enum AttachmentType {
  photo = 'photo',
  posted_photo = '',
  video = 'video',
  audio = 'audio',
  doc = 'doc',
  graffiti = 'graffiti',
  link = 'link',
  note = 'note',
  app = 'app',
  poll = 'poll',
  page = 'page',
  album = 'album',
  photos_list = 'photos_list',
  market = 'market',
  market_album = 'market_album',
  sticker = 'sticker',
  pretty_cards = 'pretty_cards'
}
interface IAdditionalProperties {
  /** Ключ доступа к контенту */
  access_key?: string;
}
export interface IPhotoAttachment extends IPhoto, IAdditionalProperties {
  /** Идентификатор записи, в которую была загружена фотография */
  post_id?: number;
}
export interface IPostedPhotoAttachment extends IAdditionalProperties {
  /** Идентификатор фотографии */
  id: number;
  /** Идентификатор владельца фотографии */
  owner_id: number;
  /** URL изображения для предпросмотра */
  photo_130: string;
  /** URL полноразмерного изображения */
  photo_604: string;
}
export interface IVideoAttachment extends IVideo, IAdditionalProperties { }
export interface IAudioAttachment extends IAudio, IAdditionalProperties { }
// export interface IDocAttachment extends IDoc, IAdditionalProperties { }
export interface IGraffitiAttachment extends IAdditionalProperties {
  /** Идентификатор граффити */
  id: number;
  /** Идентификатор автора граффити */
  owner_id: number;
  /** URL изображения для предпросмотра */
  photo_130: string;
  /** URL полноразмерного изображения */
  photo_604: string;
};
export interface IGraffitiAttachment extends IPhoto, IAdditionalProperties { }
// export interface ILinkAttachment extends ILink, IAdditionalProperties { }
// export interface INoteAttachment extends INote, IAdditionalProperties {}
export interface IAppAttachment extends IAdditionalProperties {
  /** Идентификатор приложения */
  id: number;
  /** Название приложения */
  name: string;
  /** URL изображения для предпросмотра */
  photo_130: string;
  /** URL полноразмерного изображения */
  photo_604: string;
}
// export interface IPollAttachment extends IPoll, IAdditionalProperties {}
// export interface IPageAttachment extends IPage, IAdditionalProperties {}
export interface IAlbumAttachment extends IAdditionalProperties {
  /** Идентификатор альбома */
  id: number;
  /** Обложка альбома */
  thumb: IPhoto;
  /** Идентификатор владельца альбома */
  owner_id: number;
  /** Название альбома */
  title: string;
  /** Описание альбома */
  description: string;
  /** Дата создания альбома в формате Unixtime */
  created: number;
  /** Дата последнего обновления альбома в формате Unixtime */
  updated: number;
  /** Количество фотографий в альбоме */
  size: number;
}
export interface IPhotosListAttachment extends Array<string>, IAdditionalProperties { }
// export interface IMarketAttachment extends IMarket, IAdditionalProperties { }
// export interface IMarketAlbumAttachment extends IMarketAlbum, IAdditionalProperties { }
// export interface IStickerAttachment extends ISticker, IAdditionalProperties { }
export interface IPrettyCardAttachment extends IPrettyCard, IAdditionalProperties { }

export interface IAttachment {
  readonly type: AttachmentType;
  photo?: IPhotoAttachment;
  posted_photo?: IPostedPhotoAttachment;
  video?: IVideoAttachment;
  audio?: IAudioAttachment;
  // doc?: IDocAttachment;
  graffiti?: IGraffitiAttachment;
  // link?: ILinkAttachment;
  // note?: Attachment;
  app?: IAppAttachment;
  // poll?: IPollAttachment;
  // page?: IPageAttachment;
  album?: IAlbumAttachment;
  // market?: IMarketAttachment;
  // market_album?: IMarketAlbumAttachment;
  // sticker?: IStickerAttachment;
  pretty_cards?: IPrettyCardAttachment;
}
