import * as React from "react";
import Post from "./Post";
import API from "../API";
import { IGroup, IUser } from "../API/objects";
import { infoLog, errorLog } from "../logging";

const log = infoLog("Posts");
const error = errorLog("Posts");

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
  };
  componentWillMount() {
    let { token, userId } = this.props;
    this.setState({ loading: true });
    API.wall
      .get({
        token,
        owner_id: userId,
        count: 10,
        extended: true,
        fields: ["photo_100"]
      })
      .then(res => {
        if (!res) return error('Response is undefined');
        log("Fetched initial posts", res.items);
        this.setState({
          loading: false,
          offset: res.items.length,
          postCount: res.items.length,
          end: res.count === res.items.length,
          posts: res.items.map(post => {
            let sources: any[] = [];
            if (post.copy_history) {
              sources = post.copy_history.map(repost => {
                if (repost.from_id >= 0)
                  return {
                    type: "IUser",
                    data: res.profiles.find(
                      user => user.id === repost.from_id
                    ) as IUser
                  };
                return {
                  type: "IGroup",
                  data: res.groups.find(
                    group => group.id === -repost.from_id
                  ) as IGroup
                };
              });
            }
            return (
              <Post
                key={post.id}
                data={post}
                sources={sources}
                user={res.profiles.find(user => user.id === post.from_id)}
                group={res.groups.find(group => group.id === post.from_id)}
              />
            );
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
          log(
            "props/state had changed\n",
            "newState =", newState, "\n",
            "prevState =", this.state, "\n"
          );
          return true;
        }
      }
      return false;
    } else if (newState !== this.state) {
      log(
        "props/state had changed\n",
        "newState =", newState, "\n",
        "prevState =", this.state, "\n"
      );
      return true;
    }
    return false;
  }
  componentDidUpdate() {
    let node = document.querySelector("div.post-wrapper");
    if (node) {
      let posts = node.getElementsByClassName("post");
      const maxScroll =
        node.scrollHeight - posts[posts.length - 1].clientHeight;
      if (node.clientHeight <= maxScroll / 2) return;
      this.setState({ loading: true });
      API.wall.get({
        token: this.props.token,
        owner_id: this.props.userId,
        count: 5,
        offset: this.state.offset,
        extended: true,
        fields: ["photo_100"]
      }).then(res => {
        if (!res) return error('Response is undefined');
        log("Appending initial posts", res.items);
        this.setState({
          offset: this.state.offset + res.items.length,
          postCount: this.state.postCount + res.items.length,
          loading: false,
          end: res.count === this.state.offset + res.items.length - 1,
          posts: [
            ...this.state.posts,
            ...res.items.map(post => {
              let sources: any[] = [];
              if (post.copy_history) {
                sources = post.copy_history.map(repost => {
                  if (repost.from_id >= 0)
                    return {
                      type: "IUser",
                      data: res.profiles.find(
                        user => user.id === repost.from_id
                      ) as IUser
                    };
                  return {
                    type: "IGroup",
                    data: res.groups.find(
                      group => group.id === -repost.from_id
                    ) as IGroup
                  };
                });
              }
              return (
                <Post
                  key={post.id}
                  data={post}
                  sources={sources}
                  user={res.profiles.find(user => user.id === post.from_id)}
                  group={res.groups.find(group => group.id === post.from_id)}
                />
              );
            })
          ]
        });
      });
    }
  }
  onScroll = (e: React.UIEvent<HTMLDivElement>) => {
    if (this.state.loading) return;
    let { offset, postCount } = this.state;
    const target = e.currentTarget;
    let posts = target.getElementsByClassName("post");
    const maxScroll = target.scrollHeight - posts[posts.length - 1].clientHeight;
    let scrollHeight = target.clientHeight + target.scrollTop;
    if (scrollHeight > maxScroll) {
      if (this.state.end) return;
      this.setState({ loading: true });
      API.wall.get({
        token: this.props.token,
        owner_id: this.props.userId,
        count: 5,
        offset,
        extended: true,
        fields: ["photo_100"]
      }).then(res => {
        if (!res) return error('Response is undefined');
        log("Fetched new posts", res.items);
        this.setState({
          posts: [
            ...this.state.posts.slice(res.items.length),
            ...res.items.map(post => {
              let sources: any[] = [];
              if (post.copy_history) {
                sources = post.copy_history.map(repost => {
                  if (repost.from_id >= 0)
                    return {
                      type: "IUser",
                      data: res.profiles.find(
                        user => user.id === repost.from_id
                      ) as IUser
                    };
                  return {
                    type: "IGroup",
                    data: res.groups.find(
                      group => group.id === -repost.from_id
                    ) as IGroup
                  };
                });
              }
              return (
                <Post
                  key={post.id}
                  data={post}
                  sources={sources}
                  user={res.profiles.find(user => user.id === post.from_id)}
                  group={res.groups.find(group => group.id === post.from_id)}
                />
              );
            })
          ],
          offset: offset + res.items.length,
          loading: false,
          end: res.count === offset + res.items.length - 1
        });
      });
    }
    if (target.scrollTop < posts[0].clientHeight && offset > postCount + 1) {
      this.setState({ loading: true });
      let count = offset - postCount < 5 ? offset - postCount : 5;
      API.wall.get({
        token: this.props.token,
        owner_id: this.props.userId,
        count,
        offset: offset - postCount - count,
        extended: true,
        fields: ["photo_100"]
      }).then(res => {
        if (!res) return error('Response is undefined');
        log("Fetched previous posts", res.items);
        this.setState({
          posts: [
            ...res.items.map(post => {
              let sources: any[] = [];
              if (post.copy_history) {
                sources = post.copy_history.map(repost => {
                  if (repost.from_id >= 0)
                    return {
                      type: "IUser",
                      data: res.profiles.find(
                        user => user.id === repost.from_id
                      ) as IUser
                    };
                  return {
                    type: "IGroup",
                    data: res.groups.find(
                      group => group.id === -repost.from_id
                    ) as IGroup
                  };
                });
              }
              return (
                <Post
                  key={post.id}
                  data={post}
                  sources={sources}
                  user={res.profiles.find(user => user.id === post.from_id)}
                  group={res.groups.find(group => group.id === post.from_id)}
                />
              );
            }),
            ...this.state.posts.slice(0, postCount - res.items.length)
          ],
          offset: offset - res.items.length - 1,
          loading: false,
          end: false
        });
      });
    }
  };
  render() {
    let { posts } = this.state;
    log("Rendering");
    return (
      <div className="post-wrapper" onScroll={this.onScroll}>
        {posts.length === 0 ? <span>Loading...</span> : posts}
      </div>
    );
  }
}

export default Posts;
