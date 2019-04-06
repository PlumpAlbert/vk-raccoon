import React from "react";
import { connect, MapStateToProps } from "react-redux";
import { Pages } from "../store/application/types";
import { IGlobalStore } from "../store";
import Login from "../Login";
import UserPage from "../UserPage";

type TStateProps = {
  user_id: number;
  token: string;
  activePage: Pages;
};

class ContentPresenter extends React.Component<TStateProps> {
  shouldComponentUpdate = (newProps: TStateProps) => newProps.activePage !== this.props.activePage;
  render() {
    let { activePage, user_id, token } = this.props;
    console.log("> ContentPresenter:", activePage);
    switch (activePage) {
      case Pages.Home:
        return UserPage(228116662, token);
      case Pages.News:
        return <h1>STILL IN DEVELOPMENT</h1>;
      case Pages.Notifications:
        return <h1>STILL IN DEVELOPMENT</h1>;
      case Pages.Messages:
        return <h1>STILL IN DEVELOPMENT</h1>;
      case Pages.Friends:
        return <h1>STILL IN DEVELOPMENT</h1>;
      case Pages.Groups:
        return <h1>STILL IN DEVELOPMENT</h1>;
      case Pages.Pictures:
        return <h1>STILL IN DEVELOPMENT</h1>;
      case Pages.Videos:
        return <h1>STILL IN DEVELOPMENT</h1>;
      case Pages.Bookmarks:
        return <h1>STILL IN DEVELOPMENT</h1>;
      case Pages.Documents:
        return <h1>STILL IN DEVELOPMENT</h1>;
      case Pages.Settings:
        return <h1>STILL IN DEVELOPMENT</h1>;
    }
  }
};

const mapStateToProps: MapStateToProps<TStateProps, {}, IGlobalStore> = ({ app, user }) => ({
  activePage: app.activePage,
  token: app.token,
  user_id: user.id
});

export default connect(mapStateToProps)(ContentPresenter);
