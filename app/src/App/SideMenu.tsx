import React from "react";
import { connect, MergeProps, MapDispatchToPropsFunction } from "react-redux";
import { Pages } from "../store/types";
import { changePage } from "../store/actions";
import "./css/SideMenu.css";

interface TOwnProps {
  prevPage: Pages;
}
interface TDispatchProps {
  activatePage: (newPage: Pages) => void;
}
export type SideMenuProps = TOwnProps &
  TDispatchProps & {
    onMenuItemClick: React.EventHandler<React.MouseEvent<HTMLDivElement>>;
  };

const mapDispatchToProps: MapDispatchToPropsFunction<TDispatchProps, TOwnProps> = (dispatch, { prevPage }) => ({
  activatePage: newPage => dispatch(changePage(newPage)),
  prevPage
});

const mergeProps: MergeProps<{}, TDispatchProps, TOwnProps, SideMenuProps> = (
  state,
  { activatePage },
  { prevPage }
) => ({
  prevPage,
  activatePage,
  onMenuItemClick: (e: React.MouseEvent<HTMLDivElement>) => {
    // The element that user clicked on
    let newElement = e.target as HTMLDivElement;
    let newPage = Pages[newElement.id as keyof typeof Pages];
    // If it's the same page - do nothing
    if (newPage === prevPage) return;
    // Deactivate previous page and activate new page
    if (prevPage !== Pages.Login) {
      let prevElement = document.getElementById(`${Pages[prevPage as number]}`) as HTMLDivElement;
      prevElement.classList.remove("active");
    }
    newElement.classList.add("active");
    activatePage(newPage);
  }
});

export const SideMenu: React.FC<SideMenuProps> = ({ onMenuItemClick, prevPage }) => (
  <div className='side-menu' style={prevPage === Pages.Login ? { alignItems: "flex-end" } : {}}>
    {prevPage !== Pages.Login && <span className='menu-entry fa fa-home' id='Home' onClick={onMenuItemClick} />}
    {prevPage !== Pages.Login && <span className='menu-entry fa fa-newspaper' id='News' onClick={onMenuItemClick} />}
    {prevPage !== Pages.Login && (
      <span className='menu-entry fa fa-bell' id='Notifications' onClick={onMenuItemClick} />
    )}
    {prevPage !== Pages.Login && (
      <span className='menu-entry fa fa-envelope-open' id='Messages' onClick={onMenuItemClick} />
    )}
    {prevPage !== Pages.Login && <span className='menu-entry fa fa-user' id='Friends' onClick={onMenuItemClick} />}
    {prevPage !== Pages.Login && <span className='menu-entry fa fa-users' id='Groups' onClick={onMenuItemClick} />}
    {prevPage !== Pages.Login && <span className='menu-entry fa fa-images' id='Pictures' onClick={onMenuItemClick} />}
    {prevPage !== Pages.Login && <span className='menu-entry fa fa-video' id='Videos' onClick={onMenuItemClick} />}
    {prevPage !== Pages.Login && (
      <span className='menu-entry fa fa-bookmark' id='Bookmarks' onClick={onMenuItemClick} />
    )}
    {prevPage !== Pages.Login && <span className='menu-entry fa fa-file' id='Documents' onClick={onMenuItemClick} />}
    <span className='menu-entry fa fa-cog' id='Settings' onClick={onMenuItemClick} />
  </div>
);

export default connect(
  null,
  mapDispatchToProps,
  mergeProps
)(SideMenu);
