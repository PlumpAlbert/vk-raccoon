import React from "react";
import { connect, MergeProps, MapDispatchToPropsFunction, MapStateToProps } from "react-redux";
import { changePage } from "../store/application/actions";
import { Pages } from "../store/application/types";
import { IGlobalStore } from "../store";
import "./css/SideMenu.css";
import { Log } from "../logging";

type TOwnProps = {
  visible: boolean;
}

type TStateProps = {
  prevPage: Pages;
};
type TDispatchProps = {
  activatePage: (newPage: Pages) => void;
};

export type SideMenuProps = TOwnProps & TStateProps &
  TDispatchProps & {
  onMenuItemClick: React.EventHandler<React.MouseEvent<HTMLElement>>;
};

const mapStateToProps: MapStateToProps<TStateProps, TOwnProps, IGlobalStore> = ({app}, {visible}) => ({
  prevPage: app.activePage,
  visible
});

const mapDispatchToProps: MapDispatchToPropsFunction<TDispatchProps, TOwnProps> = (dispatch, {visible}) => ({
  activatePage: newPage => dispatch(changePage(newPage)),
  visible
});

const mergeProps: MergeProps<TStateProps, TDispatchProps, TOwnProps, SideMenuProps> = ({prevPage}, {activatePage}, {visible}) => ({
  visible,
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

export const SideMenu: React.FC<SideMenuProps> = ({onMenuItemClick, prevPage, visible}) => (
  <div className={`side-menu${visible ? '' : ' hidden'}`}>
    {
      Object.keys(Pages).map(v => {
        if (!isNaN(parseInt(v))) return;
        let icon = 'menu-entry-icon fa ';
        switch (v) {
          case Pages[Pages.Home]:
            icon += 'fa-home';
            break;
          case Pages[Pages.News]:
            icon += 'fa-newspaper';
            break;
          case Pages[Pages.Notifications]:
            icon += 'fa-bell';
            break;
          case Pages[Pages.Messages]:
            icon += 'fa-envelope-open';
            break;
          case Pages[Pages.Friends]:
            icon += 'fa-user';
            break;
          case Pages[Pages.Groups]:
            icon += 'fa-users';
            break;
          case Pages[Pages.Pictures]:
            icon += 'fa-images';
            break;
          case Pages[Pages.Videos]:
            icon += 'fa-video';
            break;
          case Pages[Pages.Bookmarks]:
            icon += 'fa-bookmark';
            break;
          case Pages[Pages.Documents]:
            icon += 'fa-file';
            break;
          case Pages[Pages.Settings]:
            icon += 'fa-cog';
            break;
        }
        return (
          <div
            //@ts-ignore
            className={`${prevPage === Pages[v] ? "active" : ""} menu-entry`}
            id={v}
            onClick={onMenuItemClick}
            key={v}
          >
            <span className={icon}/>
            <span className='menu-entry-text'>{v}</span>
          </div>
        );
      })
    }
  </div>
);

const log = Log(SideMenu.name);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(SideMenu);
