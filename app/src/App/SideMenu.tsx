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

export const SideMenu: React.FC<SideMenuProps> = ({ onMenuItemClick }) => (
  <div className='side-menu'>
    <div className='menu-entry' id='Home' onClick={onMenuItemClick}>
      Home
    </div>
    <div className='menu-entry' id='News' onClick={onMenuItemClick}>
      News
    </div>
    <div className='menu-entry' id='Notifications' onClick={onMenuItemClick}>
      Notifications
    </div>
    <div className='menu-entry' id='Messages' onClick={onMenuItemClick}>
      Messages
    </div>
    <div className='menu-entry' id='Friends' onClick={onMenuItemClick}>
      Friends
    </div>
    <div className='menu-entry' id='Groups' onClick={onMenuItemClick}>
      Groups
    </div>
    <div className='menu-entry' id='Pictures' onClick={onMenuItemClick}>
      Pictures
    </div>
    <div className='menu-entry' id='Videos' onClick={onMenuItemClick}>
      Videos
    </div>
    <div className='menu-entry' id='Bookmarks' onClick={onMenuItemClick}>
      Bookmarks
    </div>
    <div className='menu-entry' id='Documents' onClick={onMenuItemClick}>
      Documents
    </div>
    <div className='menu-entry' id='Settings' onClick={onMenuItemClick}>
      Settings
    </div>
  </div>
);

export default connect(
  null,
  mapDispatchToProps,
  mergeProps
)(SideMenu);
