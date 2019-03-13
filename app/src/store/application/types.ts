export enum Pages {
  Login = 0,
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

export interface ApplicationState {
  readonly activePage: Pages;
  readonly token: string;
  readonly locale: Locale;
}
