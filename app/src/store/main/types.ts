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

export enum MainActionTypes {
  CHANGE_PAGE = "@@main/CHANGE_PAGE",
  SET_TOKEN = "@@main/SET_TOKEN"
}

export interface MainState {
  readonly activePage: Pages;
  readonly token: string;
}
