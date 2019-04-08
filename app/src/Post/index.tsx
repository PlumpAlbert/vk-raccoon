import * as React from 'react'
import { IParams } from '../API/wall/get';
import Post from './Post';
import API from '../API';
import { IGroup, IUser } from '../API/objects';

interface IProps {
  token: string;
  userId: number;
}
interface IState {
  loading: boolean;
  offset: number;
  postCount: number;
  end: boolean;
  posts: JSX.Element[];
}

class Posts extends React.Component<IProps, IState> {
  state: IState = {
    loading: false,
    offset: 0,
    postCount: 0,
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
      console.log('#POSTS > Fetched initial posts', new Date(Date.now()).toLocaleTimeString());
      this.setState({
        loading: false,
        offset: 10,
        postCount: 10,
        end: res.count <= 10,
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
  shouldComponentUpdate(newProps: IProps, newState: IState) {
    let { loading: newLoading, ...newStateProps } = newState;
    let { loading: prevLoading, ...prevStateProps } = this.state;
    if (newLoading !== prevLoading) {
      let prevS = prevStateProps as any;
      let newS = newStateProps as any;
      for (let key in prevS) {
        if (prevS[key] !== newS[key]) {
          console.log(
            '#POST > props/state had changed\n',
            'newProps =', newProps, '\n',
            'newState =', newState, '\n',
            new Date(Date.now()).toLocaleTimeString()
          );
          return true;
        };
      }
      return false;
    }
    else if (newState !== this.state) {
      console.log(
        '#POST > props/state had changed\n',
        'newProps =', newProps, '\n',
        'newState =', newState, '\n',
        new Date(Date.now()).toLocaleTimeString()
      );
      return true;
    }
    return false;
  }
  componentDidUpdate() {
    let node = document.querySelector('div.post-wrapper');
    if (node) {
      node.scrollIntoView({ block: 'center' });
      let posts = node.getElementsByClassName('post');
      const maxScroll = node.scrollHeight - posts[posts.length - 1].clientHeight;
      if (node.clientHeight <= maxScroll / 2) return;
      this.setState({ loading: true });
      API.wall.get({
        token: this.props.token,
        owner_id: this.props.userId,
        count: 5,
        offset: this.state.offset + 1,
        extended: true,
        fields: [
          "photo_100"
        ]
      }).then(res => {
        console.log('#POSTS > Appending initial posts', res.items, new Date(Date.now()).toLocaleTimeString());
        this.setState({
          offset: this.state.offset + res.items.length,
          postCount: this.state.postCount + 5,
          loading: false,
          end: res.count === this.state.offset + res.items.length,
          posts: [
            ...this.state.posts,
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
          ]
        })
      });
    }
  }
  onScroll = (e: React.UIEvent<HTMLDivElement>) => {
    if (this.state.loading) return;
    let { offset, postCount } = this.state;
    const target = e.currentTarget;
    let posts = target.getElementsByClassName('post');
    const maxScroll = target.scrollHeight - posts[posts.length - 1].clientHeight;
    if (target.clientHeight > maxScroll / 2) {
      this.setState({ loading: true });
      return API.wall.get({
        token: this.props.token,
        owner_id: this.props.userId,
        count: 5,
        offset: offset + 1,
        extended: true,
        fields: [
          "photo_100"
        ]
      }).then(res => {
        console.log('#POSTS > Appending initial posts', res.items, new Date(Date.now()).toLocaleTimeString());
        this.setState({
          offset: offset + res.items.length,
          postCount: this.state.postCount + 5,
          loading: false,
          end: res.count === offset + res.items.length,
          posts: [
            ...this.state.posts,
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
          ]
        })
      });
    }
    let scrollHeight = target.clientHeight + target.scrollTop;
    if (scrollHeight > maxScroll) {
      if (this.state.end) return;
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
        console.log('#POSTS > Fetched new posts', res.items, new Date(Date.now()).toLocaleTimeString());
        this.setState({
          posts: [
            ...this.state.posts.slice(res.items.length),
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
          offset: offset + res.items.length,
          loading: false,
          end: res.count === offset + res.items.length
        });
      });
    }
    if (target.scrollTop < posts[0].clientHeight && offset > postCount) {
      this.setState({ loading: true });
      API.wall.get({
        token: this.props.token,
        owner_id: this.props.userId,
        count: 5,
        offset: offset - postCount - 5 > 0 ? offset - postCount - 5 : 0,
        extended: true,
        fields: [
          "photo_100"
        ]
      }).then(res => {
        console.log('#POSTS > Fetched previous posts', res.items, new Date(Date.now()).toLocaleTimeString());
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
            ...this.state.posts.slice(0, res.items.length)
          ],
          offset: offset - res.items.length,
          loading: false,
          end: false
        });
      });
    }
  }
  render() {
    let { posts } = this.state;
    console.log('#POSTS > Rendering posts...', new Date(Date.now()).toLocaleTimeString());
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
