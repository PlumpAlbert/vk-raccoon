import React from "react";
import API from "../API";
import { Sex } from "../store/account/types";

interface IProps {
  token: string;
}
interface IState {
  name: string;
  sex: Sex;
  status: string;
}

export default class Home extends React.Component<IProps, IState> {
  state = {
    name: "",
    sex: Sex.undefined,
    status: ""
  };
  async componentWillMount() {
    let { first_name, maiden_name, last_name, sex, status } = await API.account.getProfileInfo(this.props.token);
    this.setState({
      name: `${first_name} ${maiden_name ? `(${maiden_name}) ` : ""}${last_name}`,
      sex,
      status
    });
  }
  render() {
    let { name, sex, status } = this.state;
    return (
      <div className='home'>
        <h1>{name}</h1>
        <p>{sex}</p>
        <a>{status}</a>
      </div>
    );
  }
}
