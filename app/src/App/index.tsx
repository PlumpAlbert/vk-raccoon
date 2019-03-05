import React from "react";
import { connect, MapStateToProps } from "react-redux";
import SideMenu from "./SideMenu";
import ContentPresenter from "./ContentPresenter";
import "./css/App.css";
import { ApplicationState, Pages } from "../store/types";

type TStateProps = {
  activePage: Pages;
};

const App: React.FC<TStateProps> = ({ activePage }) => (
  <div className='app'>
    <SideMenu prevPage={activePage} />
    <ContentPresenter activePage={activePage} />
  </div>
);

const StateToProps: MapStateToProps<TStateProps, {}, ApplicationState> = ({ activePage }) => ({
  activePage: activePage
});

export default connect(StateToProps)(App);
