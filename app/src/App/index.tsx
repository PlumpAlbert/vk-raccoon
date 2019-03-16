import React from "react";
import SideMenu from "./SideMenu";
import ContentPresenter from "./ContentPresenter";
import "./css/App.css";

const App: React.FC = () => (
  <div className='app'>
    <SideMenu />
    <ContentPresenter />
  </div>
);

export default App;
