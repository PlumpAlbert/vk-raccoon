import React from "react";
import { connect, MapStateToProps } from "react-redux";
import { Pages } from "../store/application/types";
import { IGlobalStore } from "../store";
import { IAccountState } from "../store/account/types";
import SideMenu from "./SideMenu";
import ContentPresenter from "./ContentPresenter";
import "./css/App.css";
import icon from './assets/raccoon.png';

type TStateProps = {
  user: IAccountState;
  token: string;
  activePage: Pages;
};

interface IState {
  showMenu: boolean;
}

class App extends React.PureComponent<TStateProps, IState> {
  state: IState = {
    showMenu: false
  };

  render = () => {
    let {activePage, token, user} = this.props;
    return (
      <div className='app'>
        <div className='app-header'>
          <img className='app-header-logo' src={icon} alt='raccoon.icon'
               onClick={() => this.setState({showMenu: !this.state.showMenu})}/>
          <h1>VK Raccoon</h1>
          <div className='app-header-user'>
            <img src={user.photo_100} alt='user.image'/>
          </div>
        </div>
        <div className='app-content'>
          <SideMenu visible={this.state.showMenu}/>
          <ContentPresenter {...{activePage, token, user_id: user.id}}/>
        </div>
      </div>
    )
  }
}

const mapStateToProps: MapStateToProps<TStateProps, {}, IGlobalStore> = (state) => ({
  activePage: state.app.activePage,
  token: state.app.token,
  user: state.user
});

export default connect(mapStateToProps)(App);
