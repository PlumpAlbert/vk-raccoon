import React from "react";
import { IUser, FriendStatus, Sex } from "../API/objects";
import { Order } from '../API/friends/get';
import Posts from "./UserPosts";
import API from "../API";
import { errorLog, Log } from "../logging";
import './User.css';
import { FetchError } from "../API/types";
import raccoon_glasses from "./assets/raccoon-glasses.png";

const log = Log('User');
const error = errorLog('User');

interface IProps {
  user: IUser;
  token: string;
}

interface IState {
  about: boolean;
  friends: IUser[] | null;
}

class User extends React.Component<IProps, IState> {
  state: IState = {
    about: false,
    friends: null
  };

  shouldComponentUpdate(newProps: IProps, newState: IState) {
    if (newState.about !== this.state.about) return true;
    return newState.friends !== this.state.friends;
  }

  render() {
    let {
      first_name,
      last_name,
      maiden_name,
      photo_200,
      status,
      can_write_private_message,
      can_send_friend_request,
      friend_status,
      is_closed,
      sex
    } = this.props.user;
    log('Rendering');

    let friendButton = <button className='action-btn'> {
      friend_status === FriendStatus.Friend ? "Remove from friend list" : "Add to friend list"
    } </button>;

    return (
      <div className='user'>
        <div className="user-info">
          <div className='user-wrapper'>
            <img src={photo_200} alt="UserPhoto"/>
            <h3>{`${first_name} ${maiden_name ? `(${maiden_name}) ${last_name}` : last_name}`}</h3>
            {status ? <blockquote>{status}</blockquote> : null}
            {can_write_private_message ? <button className='action-btn'>Write Message</button> : null}
            {can_send_friend_request || friend_status === FriendStatus.Friend ? friendButton : null}
            {friend_status === FriendStatus.OutRequest ? <span>{first_name} sent you a friend request</span> : null}
            {
              is_closed ? null :
                <a className="about" onClick={this.aboutClick}>
                  More information >
                </a>
            }
            {
              this.state.about ?
                <div className="about-content">
                  {this.renderFriends()}
                </div>
                : null
            }
          </div>
        </div>
        {
          !is_closed
            ? <Posts token={this.props.token} userId={this.props.user.id}/>
            : (
              <div className='private-wall' key='private-wall'>
                <img src={raccoon_glasses} alt='raccoon.security'/>
                <h1>Oooops!</h1>
                <p>
                  This raccoon is too shy to show his home for strangers!<br/>
                  If you want to see it make sure to send {sex === Sex.female ? 'her' : 'him'} a friend request
                </p>
              </div>
            )
        }
      </div>
    );
  }

  aboutClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (!this.state.about) (e.target as HTMLAnchorElement).text = 'Less information ' + String.fromCharCode(0xFE40);
    else (e.target as HTMLAnchorElement).text = 'More information >';
    this.setState({about: !this.state.about});
    if (!this.state.friends) {
      API.friends.get(this.props.token, {
        count: 4,
        order: Order.hints,
        fields: ["photo_50", "online"],
        user_id: this.props.user.id
      }).then(res => {
        let friends: IUser[] | null = null;
        if (res instanceof FetchError) {
          let err = res as FetchError;
          error(err.error_msg, err.error_code);
        } else {
          log('Fetch default friends', res);
          friends = res.items;
        }
        this.setState({friends});
      });
    }
  };

  renderFriends = () => {
    if (this.state.friends) {
      return (
        <div className='about-friends'>
          <p>Friends</p>
          <div className='friend-list'>
            {
              this.state.friends.map(friend => (
                <div key={friend.id} className='friend-list-item'>
                  <img src={friend.photo_50} alt='friend.image'/>
                  <p>{`${friend.first_name} ${friend.last_name}`}</p>
                </div>
              ))
            }
          </div>
        </div>
      );
    } else return null;
  };
}


export default User;
