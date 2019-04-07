import * as React from 'react'
import { IParams, IResponse } from '../API/wall/get';
import Post, { IProps as PostProps } from './Post';
import API from '../API';
import { IGroup, IUser } from '../API/objects';

interface IProps {
  token: string;
  userId: number;
}
interface IState {
  loading: boolean;
  offset: number;
  posts: IResponse | null
}

class Posts extends React.Component<IProps, IState> {
  state: IState = {
    loading: false,
    offset: 0,
    posts: null
  }
  componentWillMount() {
    let { token, userId } = this.props;
    this.setState({ loading: true });
    let req: IParams = {
      token,
      owner_id: userId,
      count: 10,
      extended: true,
      fields: [
        "photo_100"
      ]
    };
    API.wall.get(req).then(res => {
      this.setState({
        loading: false,
        offset: 10,
        posts: res
      });
    });
  }
  onScroll = (e: React.UIEvent<HTMLDivElement>) => {
    let target = e.currentTarget;
    target.removeEventListener('scroll', this.onScroll as any);
    let scrollHeight = target.clientHeight + target.scrollTop;
    if (scrollHeight > target.scrollHeight - 500) {
      API.wall.get({
        token: this.props.token,
        owner_id: this.props.userId,
        count: this.state.offset + 5,
        extended: true,
        fields: [
          "photo_100"
        ]
      }).then(res => {
        let { offset } = this.state;
        let count = res.count - offset < 5
          ? res.count - offset
          : 5;
        this.setState({ posts: res, offset: offset + count });
      });
    }
  }
  render() {
    let { loading, posts } = this.state;
    let data = posts as IResponse;
    posts ? console.log('> Post count', posts.items.length) : null;
    return (
      <div className='post-wrapper' onScroll={this.onScroll}>{
        loading
          ? <span>Loading...</span>
          : posts ? posts.items.map((post, i) => {
            let sources: any[] = [];
            if (post.copy_history) {
              sources = post.copy_history.map(repost => {
                if (repost.from_id >= 0)
                  return {
                    type: 'IUser',
                    data: data.profiles.find(user => user.id === repost.from_id) as IUser
                  };
                return {
                  type: 'IGroup',
                  data: data.groups.find(group => group.id === -repost.from_id) as IGroup
                };
              });
            }
            return <Post
              id={i}
              key={post.id}
              data={post}
              sources={sources}
              user={data.profiles.find(user => user.id === post.from_id)}
              group={data.groups.find(group => group.id === post.from_id)}
            />
          }) : null
      }</div>
    );
  }
}

export default Posts;
