import React from "react";

type TState = {
  email: string;
  pass: string;
};

class Login extends React.Component<{}, TState> {
  onSubmit = () => {};
  render() {
    return (
      <div className='login'>
        <input type='text' name='email' onChange={e => this.setState({ email: e.target.value })} />
        <input type='password' name='pass' onChange={e => this.setState({ pass: e.target.value })} />
        <button onClick={this.onSubmit}>Sign In</button>
      </div>
    );
  }
}

export default Login;
