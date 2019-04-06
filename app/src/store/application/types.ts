export enum Pages {
  Home,
  News,
  Notifications,
  Messages,
  Friends,
  Groups,
  Pictures,
  Videos,
  Bookmarks,
  Documents,
  Settings
}

export enum Locale {
  ru = "ru-RU",
  en = "en-US"
}

export enum ActionTypes {
  changePage = "@@application/CHANGE_PAGE",
  setToken = "@@application/SET_TOKEN",
  changeLocale = "@@application/CHANGE_LOCALE"
}

export interface IApplicationState {
  activePage: Pages;
  token: string;
  locale: Locale;
}
