import React from "react";
import { connect, MapStateToProps } from "react-redux";
import { Pages } from "../store/application/types";
import { IGlobalStore } from "../store";
import Dev from "../dev";
import UserPage from "../UserPage";
import Messages from "../Messages";
import { Log } from "../logging";
import NewsFeed from "../News";

const log = Log('ContentPresenter');

type TStateProps = {
  user_id: number;
  token: string;
  activePage: Pages;
};

class ContentPresenter extends React.Component<TStateProps> {
  shouldComponentUpdate = (newProps: TStateProps) => newProps.activePage !== this.props.activePage;
  render() {
    let { activePage, user_id, token } = this.props;
    log('Active page:', Pages[activePage]);
    switch (activePage) {
      case Pages.Home:
        const Kate = 445367510;
        const Anya = 228116662;
        const Arthur = 310543856;
        return UserPage(Anya, token);
      case Pages.News:
        return <NewsFeed token={token} post_count={10} update_count={5} />;
      case Pages.Notifications:
        return <Dev />;
      case Pages.Messages:
        return <Messages token={token} />;
      case Pages.Friends:
        return <Dev />;
      case Pages.Groups:
        return <Dev />;
      case Pages.Pictures:
        return <Dev />;
      case Pages.Videos:
        return <Dev />;
      case Pages.Bookmarks:
        return <Dev />;
      case Pages.Documents:
        return <Dev />;
      case Pages.Settings:
        return <Dev />;
    }
  }
};

const mapStateToProps: MapStateToProps<TStateProps, {}, IGlobalStore> = ({ app, user }) => ({
  activePage: app.activePage,
  token: app.token,
  user_id: user.id
});

export default connect(mapStateToProps)(ContentPresenter);
