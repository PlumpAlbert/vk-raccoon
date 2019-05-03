import React from "react";
import { Pages } from "../store/application/types";
import Dev from "../dev";
import UserPage from "../UserPage";
import Messages from "../Messages";
import { Log } from "../logging";
import NewsFeed from "../News";

const log = Log('ContentPresenter');

interface IProps {
  user_id: number;
  token: string;
  activePage: Pages;
}

const ContentPresenter = React.memo(({activePage, user_id, token}: IProps) => {
  log('Active page:', Pages[activePage]);
  switch (activePage) {
    case Pages.Home:
      const Kate = 445367510;
      const Anya = 228116662;
      const Arthur = 310543856;
      return UserPage(Anya, token);
    case Pages.News:
      return <NewsFeed token={token} post_count={50} update_count={20}/>;
    case Pages.Notifications:
      return <Dev/>;
    case Pages.Messages:
      return <Messages token={token}/>;
    case Pages.Friends:
      return <Dev/>;
    case Pages.Groups:
      return <Dev/>;
    case Pages.Pictures:
      return <Dev/>;
    case Pages.Videos:
      return <Dev/>;
    case Pages.Bookmarks:
      return <Dev/>;
    case Pages.Documents:
      return <Dev/>;
    case Pages.Settings:
      return <Dev/>;
  }
});

export default ContentPresenter;