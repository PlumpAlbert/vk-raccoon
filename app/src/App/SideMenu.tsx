import React from "react";
import { connect, MergeProps, MapDispatchToPropsFunction, MapStateToProps } from "react-redux";
import { changePage } from "../store/application/actions";
import { Pages } from "../store/application/types";
import { IGlobalStore } from "../store";
import "./css/SideMenu.css";
import { Log } from "../logging";

type TStateProps = {
  prevPage: Pages;
};
type TDispatchProps = {
  activatePage: (newPage: Pages) => void;
};

export type SideMenuProps = TStateProps &
  TDispatchProps & {
    onMenuItemClick: React.EventHandler<React.MouseEvent<HTMLElement>>;
  };

const mapStateToProps: MapStateToProps<TStateProps, {}, IGlobalStore> = ({ app }) => ({
  prevPage: app.activePage
});

const mapDispatchToProps: MapDispatchToPropsFunction<TDispatchProps, {}> = dispatch => ({
  activatePage: newPage => dispatch(changePage(newPage))
});

const mergeProps: MergeProps<TStateProps, TDispatchProps, {}, SideMenuProps> = ({ prevPage }, { activatePage }) => ({
  prevPage,
  activatePage,
  onMenuItemClick: function (e) {
    log(`Switching to ${e.currentTarget.id}`)
    // The element that user clicked on
    let newElement = e.target as HTMLElement;
    let newPage = Pages[newElement.id as keyof typeof Pages];
    // If it's the same page - do nothing
    if (newPage === prevPage) return;
    // Deactivate previous page and activate new page
    let prevElement = document.getElementById(`${Pages[prevPage as number]}`) as HTMLElement;
    prevElement.classList.remove("active");
    newElement.classList.add("active");
    activatePage(newPage);
  }
});

export const SideMenu: React.FC<SideMenuProps> = ({ onMenuItemClick, prevPage }) => (
  <div className='side-menu'>
    <span
      className={`${prevPage === Pages.Home ? "active" : ""} menu-entry fa fa-home`}
      id='Home'
      onClick={onMenuItemClick}
    />
    <span
      className={`${prevPage === Pages.News ? "active" : ""} menu-entry fa fa-newspaper`}
      id='News'
      onClick={onMenuItemClick}
    />
    <span
      className={`${prevPage === Pages.Notifications ? "active" : ""} menu-entry fa fa-bell`}
      id='Notifications'
      onClick={onMenuItemClick}
    />
    <span
      className={`${prevPage === Pages.Messages ? "active" : ""} menu-entry fa fa-envelope-open`}
      id='Messages'
      onClick={onMenuItemClick}
    />
    <span
      className={`${prevPage === Pages.Friends ? "active" : ""} menu-entry fa fa-user`}
      id='Friends'
      onClick={onMenuItemClick}
    />
    <span
      className={`${prevPage === Pages.Groups ? "active" : ""} menu-entry fa fa-users`}
      id='Groups'
      onClick={onMenuItemClick}
    />
    <span
      className={`${prevPage === Pages.Pictures ? "active" : ""} menu-entry fa fa-images`}
      id='Pictures'
      onClick={onMenuItemClick}
    />
    <span
      className={`${prevPage === Pages.Videos ? "active" : ""} menu-entry fa fa-video`}
      id='Videos'
      onClick={onMenuItemClick}
    />
    <span
      className={`${prevPage === Pages.Bookmarks ? "active" : ""} menu-entry fa fa-bookmark`}
      id='Bookmarks'
      onClick={onMenuItemClick}
    />
    <span
      className={`${prevPage === Pages.Documents ? "active" : ""} menu-entry fa fa-file`}
      id='Documents'
      onClick={onMenuItemClick}
    />
    <span
      className={`${prevPage === Pages.Settings ? "active" : ""} menu-entry fa fa-cog`}
      id='Settings'
      onClick={onMenuItemClick}
    />
  </div>
);

const log = Log(SideMenu.name);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(SideMenu);
