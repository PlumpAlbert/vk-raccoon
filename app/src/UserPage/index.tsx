import React from 'react';
import { IUser } from '../API/objects';
import API from '../API';
import User from './User';

export default function UserPage(userId: number, token: string) {
  type TState = {
    loading: boolean,
    loaded: boolean,
    user: IUser | null
  }
  class UserPage extends React.Component<{}, TState> {
    state: TState = {
      loading: false,
      loaded: false,
      user: null
    }
    componentWillMount() {
      this.setState({ loading: true });
      API.users.get({
        token,
        users: [userId],
        fields: [
          "friend_status",
          "maiden_name",
          "can_send_friend_request",
          "can_write_private_message",
          "status",
          "photo_200"
        ]
      }).then(users => {
        this.setState({
          loading: false,
          loaded: true,
          user: users[0]
        });
      })
    }
    render() {
      let { loading, user } = this.state;
      return (
        loading
          ? <div>Loading...</div>
          : user ? <User user={user} token={token}></User> : null
      )
    }
  }
  return <UserPage />
}
