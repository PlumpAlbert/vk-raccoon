import React, { Fragment } from "react";
import API from "../API";
import { IUser, Sex, FriendStatus } from "../API/types/user";
import { MapStateToProps } from "react-redux";
import { IGlobalStore } from "../store";
import { connect } from "react-redux";

import './UserPage.css';

interface IOwnProps {
  user_id: number;
}
interface IStateProps {
  token: string;
}

interface IProps extends IOwnProps, IStateProps { }

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
        fields: [
          "friend_status",
          "maiden_name",
          "can_send_friend_request",
          "can_write_private_message",
          "status",
          "photo_400_orig"
        ],
        users: [this.props.user_id]
      })
      .then(users => {
        self.setState(users[0]);
      });
  };

  componentWillMount = () => this.loadUserInfo();
  componentDidUpdate = (prevProps: Readonly<IProps>) => {
    if (prevProps.user_id !== this.props.user_id) this.loadUserInfo();
  };
  render() {
    let {
      first_name,
      last_name,
      maiden_name,
      photo_400_orig,
      status,
      can_write_private_message,
      can_send_friend_request,
      friend_status
    } = this.state;
    let friendButton = null;
    if (friend_status) {
      friendButton = <button> {
        friend_status === FriendStatus.Friend ? "Remove from friend list" :
          friend_status === FriendStatus.InRequest ? "In your friend list" : "Add to friend list"
      } </button>;
    }
    return (
      <div className='user'>
        <div className="user-info">
          <div className="user-wrapper">
            <img src={photo_400_orig} alt="UserPhoto" />
            <h1>{`${first_name} ${maiden_name ? `(${maiden_name}) ${last_name}` : last_name}`}</h1>
            <blockquote>{status}</blockquote>
            {can_write_private_message ? <button>Write Message</button> : null}
            {can_send_friend_request || friend_status === FriendStatus.Friend ? friendButton : null}
            {friend_status === FriendStatus.OutRequest ? <span>{first_name} sent you a friend request</span> : null}
          </div>
        </div>
        <div className="user-content"></div>
        <div className="user-counters"></div>
      </div>
    );
  }
}

const mapStateToProps: MapStateToProps<IStateProps, IOwnProps, IGlobalStore> = ({ app }, props) => ({
  token: app.token,
  ...props
});

export default connect(mapStateToProps)(UserPage);
