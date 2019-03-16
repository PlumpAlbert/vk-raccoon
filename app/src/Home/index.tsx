import React from "react";
import API from "../API";
import { IUser, Sex } from "../API/types/user";
import { MapStateToProps } from "react-redux";
import { IGlobalStore } from "../store";
import { connect } from "react-redux";

interface IOwnProps {
  user_id: number;
}
interface IStateProps {
  token: string;
}

interface IProps extends IOwnProps, IStateProps {}

class UserPage extends React.Component<IProps, IUser> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      id: props.user_id,
      first_name: "",
      last_name: "",
      is_closed: false,
      can_access_closed: true
    };
  }

  loadUserInfo = () => {
    let self = this;
    API.users
      .get({
        token: this.props.token,
        fields: ["sex", "status"],
        users: [this.props.user_id]
      })
      .then(users => {
        console.log(users);
        self.setState(users[0]);
      });
  };

  componentWillMount = () => this.loadUserInfo();
  componentDidUpdate = (prevProps: Readonly<IProps>) => {
    if (prevProps.user_id !== this.props.user_id) this.loadUserInfo();
  };
  render() {
    let { first_name, last_name, sex, status } = this.state;
    return (
      <div className='home'>
        <h1>{`${first_name} ${last_name}`}</h1>
        <p>{sex ? Sex[sex] : ""}</p>
        <a>{status}</a>
      </div>
    );
  }
}

const mapStateToProps: MapStateToProps<IStateProps, IOwnProps, IGlobalStore> = ({ app }, props) => ({
  token: app.token,
  ...props
});

export default connect(mapStateToProps)(UserPage);
