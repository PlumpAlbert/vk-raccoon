import React from "react";
import "./App.css";
import SideMenu from "../components/SideMenu";

const App: React.FC = () => (
  <div className='app'>
    <SideMenu />
    <div className='content' />
  </div>
);

export default App;
