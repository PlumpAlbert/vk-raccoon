import React from "react";
import { IUser, FriendStatus } from "../../API/types/user";

import './UserPage.css';

interface IProps {
  user: IUser;
}

const User: React.FC<IProps> = props => {
  let {
    first_name,
    last_name,
    maiden_name,
    photo_400_orig,
    status,
    can_write_private_message,
    can_send_friend_request,
    friend_status
  } = props.user;
  let friendButton = null;
  if (friend_status) {
    friendButton = <button> {
      friend_status === FriendStatus.Friend ? "Remove from friend list" : "Add to friend list"
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


export default User;
