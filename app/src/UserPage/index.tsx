import React from 'react';
import { IUser } from '../API/objects';
import API from '../API';
import User from './User';
import { FetchError } from "../API/types";
import { errorLog } from '../logging'

const error = errorLog(UserPage.name);

export default function UserPage(userId: number, token: string) {
  type TState = {
    loading: boolean,
    user: IUser | null
  }

  class UserPage extends React.Component<{}, TState> {
    state: TState = {
      loading: false,
      user: null
    };

    componentWillMount() {
      this.setState({loading: true});
      API.users.get({
        token,
        users: [userId],
        fields: [
          "friend_status",
          "maiden_name",
          "can_send_friend_request",
          "can_write_private_message",
          "status",
          "sex",
          "photo_200"
        ]
      }).then(users => {
        if (users instanceof FetchError) {
          error(`Couldn't fetch user information (id: ${userId})`);
          this.setState({loading: false});
        }
        this.setState({
          loading: false,
          user: users[0]
        });
      })
    }

    render() {
      let {loading, user} = this.state;
      return (
        loading
          ? <div>Loading...</div>
          : user ? <User user={user} token={token}/>
          : (
            <h1 style={{color: 'crimson'}}>
              HEY DUDE! THERE'S A F*CKING ERROR!
            </h1>
          )
      )
    }
  }

  return <UserPage/>
}
