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
  end: boolean;
  posts: JSX.Element[]
}

class Posts extends React.Component<IProps, IState> {
  state: IState = {
    loading: false,
    offset: 0,
    end: false,
    posts: []
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
      console.log('> Fetched first posts', new Date(Date.now()).toLocaleString());
      this.setState({
        loading: false,
        offset: 10,
        posts: res.items.map(post => {
          let sources: any[] = [];
          if (post.copy_history) {
            sources = post.copy_history.map(repost => {
              if (repost.from_id >= 0)
                return {
                  type: 'IUser',
                  data: res.profiles.find(user => user.id === repost.from_id) as IUser
                };
              return {
                type: 'IGroup',
                data: res.groups.find(group => group.id === -repost.from_id) as IGroup
              };
            });
          }
          return <Post
            key={post.id}
            data={post}
            sources={sources}
            user={res.profiles.find(user => user.id === post.from_id)}
            group={res.groups.find(group => group.id === post.from_id)}
          />
        })
      });
    });
  }
  onScroll = (e: React.UIEvent<HTMLDivElement>) => {
    if (this.state.loading) return;
    if (this.state.end) return;
    let { offset } = this.state;
    let target = e.currentTarget;
    let posts = target.getElementsByClassName('post');
    let scrollHeight = target.clientHeight + target.scrollTop;
    if (scrollHeight > target.scrollHeight - posts[posts.length - 1].clientHeight) {
      this.setState({ loading: true });
      API.wall.get({
        token: this.props.token,
        owner_id: this.props.userId,
        count: 5,
        offset: offset + 1,
        extended: true,
        fields: [
          "photo_100"
        ]
      }).then(res => {
        console.log('> Fetched new posts', res.items, new Date(Date.now()).toLocaleString());
        let count = res.count - offset < 5
          ? res.count - offset
          : 5;
        // let removedClientHeight = 0;
        // for (let i = 0; i < count; i++) removedClientHeight -= posts[i].clientHeight;
        // if (target.scrollTop - removedClientHeight > 500)
        //   target.scrollBy(0, removedClientHeight);
        // else
        //   target.scrollTo(0, 750);
        target.scrollIntoView({ block: 'center' });
        this.setState({
          posts: [
            ...this.state.posts.slice(count),
            ...res.items.map(post => {
              let sources: any[] = [];
              if (post.copy_history) {
                sources = post.copy_history.map(repost => {
                  if (repost.from_id >= 0)
                    return {
                      type: 'IUser',
                      data: res.profiles.find(user => user.id === repost.from_id) as IUser
                    };
                  return {
                    type: 'IGroup',
                    data: res.groups.find(group => group.id === -repost.from_id) as IGroup
                  };
                });
              }
              return <Post
                key={post.id}
                data={post}
                sources={sources}
                user={res.profiles.find(user => user.id === post.from_id)}
                group={res.groups.find(group => group.id === post.from_id)}
              />
            })
          ],
          offset: offset + count,
          loading: false,
          end: res.count === offset + count
        });
      });
    }
    if (target.scrollTop < 500 && offset !== 10) {
      this.setState({ loading: true });
      API.wall.get({
        token: this.props.token,
        owner_id: this.props.userId,
        count: 5,
        offset: offset - 15,
        extended: true,
        fields: [
          "photo_100"
        ]
      }).then(res => {
        console.log('> Fetched previous posts', res.items, new Date(Date.now()).toLocaleString());
        let count = res.count - offset < 5
          ? res.count - offset
          : 5;
        // let removedClientHeight = 0;
        // for (let i = 1; i <= count; i++) removedClientHeight += posts[posts.length - i].clientHeight;
        // target.scrollBy(0, removedClientHeight);
        target.scrollIntoView({ block: 'center' });
        this.setState({
          posts: [
            ...res.items.map(post => {
              let sources: any[] = [];
              if (post.copy_history) {
                sources = post.copy_history.map(repost => {
                  if (repost.from_id >= 0)
                    return {
                      type: 'IUser',
                      data: res.profiles.find(user => user.id === repost.from_id) as IUser
                    };
                  return {
                    type: 'IGroup',
                    data: res.groups.find(group => group.id === -repost.from_id) as IGroup
                  };
                });
              }
              return <Post
                key={post.id}
                data={post}
                sources={sources}
                user={res.profiles.find(user => user.id === post.from_id)}
                group={res.groups.find(group => group.id === post.from_id)}
              />
            }),
            ...this.state.posts.slice(0, count)
          ],
          offset: offset - count,
          loading: false,
          end: false
        });
      });
    }
  }
  render() {
    let { posts } = this.state;
    console.log('> Rendering posts...', new Date(Date.now()).toLocaleString());
    return (
      <div className='post-wrapper' onScroll={this.onScroll}>{
        posts.length === 0
          ? <span>Loading...</span>
          : posts
      }</div>
    );
  }
}

export default Posts;
