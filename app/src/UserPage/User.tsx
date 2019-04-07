import React from "react";
import { IUser, FriendStatus } from "../API/objects/user";
import { IResponse as IFriends, Order } from '../API/friends/get';

import './UserPage.css';
import Posts from "../Post";
import API from "../API";

interface IProps {
  user: IUser;
  token: string;
}

interface IState {
  about: boolean;
  offset: number;
  friends: IFriends | null;
}

class User extends React.Component<IProps, IState> {
  state: IState = {
    about: false,
    offset: 0,
    friends: null
  };
  shouldComponentUpdate(newProps: IProps, newState: IState) {
    if (newState.offset !== this.state.offset) return true;
    if (newState.about !== this.state.about) return true;
    if (newState.friends !== this.state.friends) return true;
    if (newState.offset !== this.state.offset) {
      API.friends.get(this.props.token, {
        count: 4,
        order: Order.hints,
        fields: ["photo_50", "online"],
        offset: newState.offset,
        user_id: this.props.user.id
      }).then(res => {
        this.setState({ friends: res });
      });
    }
    return false;
  }
  render() {
    console.log('#USER > Rendering', new Date(Date.now()).toLocaleTimeString());
    let {
      first_name,
      last_name,
      maiden_name,
      photo_200,
      status,
      can_write_private_message,
      can_send_friend_request,
      friend_status
    } = this.props.user;

    let friendButton = null;
    if (friend_status) {
      friendButton = <button className='action-btn'> {
        friend_status === FriendStatus.Friend ? "Remove from friend list" : "Add to friend list"
      } </button>;
    }

    return (
      <div className='user'>
        <div className="user-info">
          <div className='user-wrapper'>
            <img src={photo_200} alt="UserPhoto" />
            <h3>{`${first_name} ${maiden_name ? `(${maiden_name}) ${last_name}` : last_name}`}</h3>
            {status ? <blockquote>{status}</blockquote> : null}
            {can_write_private_message ? <button className='action-btn'>Write Message</button> : null}
            {can_send_friend_request || friend_status === FriendStatus.Friend ? friendButton : null}
            {friend_status === FriendStatus.OutRequest ? <span>{first_name} sent you a friend request</span> : null}
            <a
              className="about"
              onClick={this.aboutClick}
            >More information ></a>
            {this.state.about ?
              <div className="about-content">
                <div className='about-friends'>
                  <p>Friends</p>
                  <div className='friend-list'>
                    {
                      this.renderFriends()
                    }
                  </div>
                </div>
              </div>
              : null}
          </div>
        </div>
        <Posts token={this.props.token} userId={this.props.user.id} />
      </div>
    );
  }
  aboutClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (!this.state.about) (e.target as HTMLAnchorElement).text = 'Less information ' + String.fromCharCode(0xFE40);
    else (e.target as HTMLAnchorElement).text = 'More information >';
    this.setState({ about: !this.state.about });
    if (!this.state.friends) {
      API.friends.get(this.props.token, {
        count: 4,
        order: Order.hints,
        fields: ["photo_50", "online"],
        offset: this.state.offset,
        user_id: this.props.user.id
      }).then(res => {
        console.log('#USER > Fetch default friends', res, new Date(Date.now()).toLocaleString());
        this.setState({ friends: res });
      });
    }
  }
  renderFriends = () => {
    if (this.state.friends) {
      return this.state.friends.items.map(friend => (
        <div key={friend.id} className='friend-list-item'>
          <img src={friend.photo_50} />
          <p>{`${friend.first_name} ${friend.last_name}`}</p>
        </div>
      ));
    } else null;
  }
}


export default User;
