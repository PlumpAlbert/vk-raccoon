import React from "react";
import { connect, MapStateToProps } from "react-redux";
import SideMenu from "./SideMenu";
import ContentPresenter from "./ContentPresenter";
import { ApplicationState, Pages } from "../store/application/types";
import "./css/App.css";

interface IStoreProps {
  activePage: Pages;
}

const App: React.FC<IStoreProps> = ({ activePage }) => (
  <div className='app'>
    <SideMenu prevPage={activePage} />
    <ContentPresenter activePage={activePage} />
  </div>
);

const StateToProps: MapStateToProps<IStoreProps, {}, ApplicationState> = ({ activePage }) => ({
  activePage: activePage
});

export default connect(StateToProps)(App);
