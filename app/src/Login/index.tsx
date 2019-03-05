import React from "react";
import "./style.css";
import { connect, MapDispatchToProps } from "react-redux";
import { setToken } from "../store/actions";

type TState = {
  email: string;
  pass: string;
};

export class Login extends React.Component<TDispatchProps, TState> {
  state: TState = {
    email: "",
    pass: ""
  };
  onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let { ipcRenderer } = (window as any).require("electron");
    ipcRenderer.once("token", (event: any, token: string) => {
      if (token === "err") {
        console.error("TOKEN IS NOT DEFINED");
      } else {
        this.props.changeToken(token);
      }
    });
    ipcRenderer.send("login", { email: this.state.email, pass: this.state.pass });
  };
  render() {
    return (
      <div className='login'>
        <form className='login-form' action='' onSubmit={this.onSubmit}>
          <div className='input-wrapper'>
            <input type='text' placeholder=' ' onChange={e => this.setState({ email: e.target.value })} />
            <label>Email or Phone Number</label>
            <span className='border' />
          </div>
          <div className='input-wrapper'>
            <input type='password' placeholder=' ' onChange={e => this.setState({ pass: e.target.value })} />
            <label>Password</label>
            <span className='border' />
          </div>
          <input type='submit' value='Sign In' />
        </form>
      </div>
    );
  }
}

interface TDispatchProps {
  changeToken: (token: string) => void;
}

const mapDispatchToProps: MapDispatchToProps<TDispatchProps, {}> = dispatch => ({
  changeToken: token => dispatch(setToken(token))
});

export default connect<{}, TDispatchProps, {}, TState>(
  null,
  mapDispatchToProps
)(Login);
