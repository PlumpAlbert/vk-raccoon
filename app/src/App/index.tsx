import React from "react";
import { connect, MapStateToProps } from "react-redux";
import SideMenu from "./SideMenu";
import ContentPresenter from "./ContentPresenter";
import { Pages } from "../store/main";
import { ApplicationState } from "../store";
import "./css/App.css";

type TStateProps = {
  activePage: Pages;
};

const App: React.FC<TStateProps> = ({ activePage }) => (
  <div className='app'>
    <SideMenu prevPage={activePage} />
    <ContentPresenter activePage={activePage} />
  </div>
);

const StateToProps: MapStateToProps<TStateProps, {}, ApplicationState> = ({ mainState }) => ({
  activePage: mainState.activePage
});

export default connect(StateToProps)(App);
