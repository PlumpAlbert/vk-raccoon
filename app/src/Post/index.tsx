import * as React from 'react'
import { IResponse, IParams } from '../API/wall/get';
import Post from './Post';
import API from '../API';

const PostLoader = (token: string, userId?: number) => {
  type TState = {
    loading: boolean,
    loaded: boolean,
    posts?: IResponse
  }
  class PostLoader extends React.Component<{}, TState> {
    state: TState = {
      loaded: false,
      loading: false
    }

    componentWillMount() {
      this.setState({ loading: true });
      let req: IParams = {
        count: 10,
        extended: true,
        fields: [
          "photo_100"
        ],
        token
      };
      userId ? req.owner_id = userId : null;
      API.wall.get(req).then(res => {
        this.setState({ loading: false, loaded: true, posts: res });
      });
    }

    render() {
      let { posts } = this.state;
      return (
        <div className="user-content">
          {posts ? <Post {...posts} /> : 'Loading...'}
        </div>
      )
    }
  }
  return <PostLoader />
}

export default PostLoader;
