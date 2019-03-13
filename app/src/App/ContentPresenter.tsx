import React from "react";
import { connect, MapStateToProps } from "react-redux";
import { Pages, ApplicationState } from "../store/application/types";
import Login from "../Login";
import UserPage from "../Home";

type TOwnProps = {
  activePage: Pages;
};

type TStateProps = {
  token: string;
};

const ContentPresenter: React.FC<TOwnProps & TStateProps> = ({ activePage, token }) => {
  switch (activePage) {
    case Pages.Login:
      return <Login />;
    case Pages.Home:
      return <UserPage />;
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
};

const mapStateToProps: MapStateToProps<TStateProps, TOwnProps, ApplicationState> = ({ token }, ownProps) => ({
  token,
  ...ownProps
});

export default connect(mapStateToProps)(ContentPresenter);
