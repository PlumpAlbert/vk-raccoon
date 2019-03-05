import React from "react";
import { Pages } from "../store/types";
import Login from "../Login";

type TOwnProps = {
  activePage: Pages;
};

const ContentPresenter: React.FC<TOwnProps> = ({ activePage }) => (
  <div className='content-wrapper'>
    {(() => {
      switch (activePage) {
        case Pages.Login:
          return <Login />;
        // case Pages.News:
        //   return <News />;
        // case Pages.Notifications:
        //   return <Notifications />;
        // case Pages.Messages:
        //   return <Messages />;
        // case Pages.Friends:
        //   return <Friends />;
        // case Pages.Groups:
        //   return <Groups />;
        // case Pages.Pictures:
        //   return <Pictures />;
        // case Pages.Videos:
        //   return <Videos />;
        // case Pages.Bookmarks:
        //   return <Bookmarks />;
        // case Pages.Documents:
        //   return <Documents />;
        // case Pages.Settings:
        //   return <Settings />;
        default:
          return <h1>STILL IN DEVELOPMENT</h1>;
      }
    })()}
  </div>
);

export default ContentPresenter;
