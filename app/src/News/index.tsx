import * as React from 'react'
import API from '../API';
import { Filter, IPostNews } from '../API/newsfeed/types';
import Post, { IProps as PostProps } from '../Post';
import { IGroup, IUser } from '../API/objects';
import { Log, errorLog, infoLog } from '../logging';
import './news.css'

interface IProps {
  token: string;
  /** Количество постов, отображающихся одновременно */
  post_count: number;
  /** Количество постов, подгружаемых во время просмотра новостей */
  update_count: number;
}

interface IState {
  start: boolean;
  end: boolean;
  fetching: boolean;
  start_from: string;
  prev_start: number[];
  posts: JSX.Element[];
}

export default class NewsFeed extends React.Component<IProps, IState> {

  constructor(props: IProps) {
    super(props);
    API.newsfeed.get({
      token: props.token,
      filters: Filter.post,
      count: this.props.post_count,
      fields: [
        'first_name',
        'last_name',
        'name',
        'photo_100'
      ]
    }).then(res => {
      log("Fetched first news");
      this.setState({
        fetching: false,
        start: true,
        end: false,
        start_from: res.next_from,
        posts: res.items.map<JSX.Element>(p => {
          let post = p as IPostNews;
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
              key={post.post_id}
              data={{
                id: post.post_id,
                attachments: post.attachments,
                copy_history: post.copy_history,
                date: post.date,
                likes: post.likes,
                text: post.text
              }}
              sources={sources}
              user={res.profiles.find(user => user.id === post.source_id)}
              group={res.groups.find(group => group.id === -post.source_id)}
            />
          );
        })
      });
    });
    this.state = {
      start: false,
      end: false,
      start_from: '',
      prev_start: [],
      posts: [],
      fetching: true
    };
    log("Created new instance");
  }

  shouldComponentUpdate = (nextProps: IProps, nextState: IState) => {
    if (nextState.fetching !== this.state.fetching) {
      for (let key in nextState) {
        if (key !== 'fetching' && (nextState as any)[key] !== (this.state as any)[key]) {
          info(`Component should update! Property changed: ${key}`);
          return true;
        }
      }
      return false;
    }
    if (this.state.posts.some((v, i) => v.key !== nextState.posts[i].key)) {
      info(
        'Component should update!',
        '\nnextState: ', nextState,
        '\nprevState: ', this.state
      );
      return true;
    }
    return false;
  };

  onScroll = async (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const scrolled = target.scrollTop + target.clientHeight;
    let delta = 0;
    for (let i = 1; i < 3; i++)
      delta += target.children[target.children.length - i].clientHeight;
    const maxScroll = target.scrollHeight - delta;
    // At the end of the newsfeed
    if (
      !this.state.fetching
      && !this.state.end
      && scrolled > maxScroll
    ) {
      this.setState({fetching: true});
      log('Fetching new posts');
      API.newsfeed.get({
        token: this.props.token,
        start_from: this.state.start_from,
        filters: Filter.post,
        count: this.props.update_count,
        fields: [
          'first_name',
          'last_name',
          'name',
          'photo_100'
        ]
      }).then(res => {
        log('Fetching done!', res);
        this.setState({
          start: false,
          end: res.items.length === 0,
          start_from: res.next_from,
          prev_start: [
            ...this.state.prev_start,
            (this.state.posts[0].props as PostProps).data.date
          ],
          posts: [
            ...this.state.posts.slice(res.items.length),
            ...res.items.map<JSX.Element>(p => {
              let post = p as IPostNews;
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
                  key={post.post_id}
                  data={{
                    id: post.post_id,
                    attachments: post.attachments,
                    copy_history: post.copy_history,
                    date: post.date,
                    likes: post.likes,
                    text: post.text
                  }}
                  sources={sources}
                  user={res.profiles.find(user => user.id === post.source_id)}
                  group={res.groups.find(group => group.id === -post.source_id)}
                />
              );
            })
          ]
        });
      });
    }
    delta = 0;
    for (let i = 0; i < 2; i++)
      delta += target.children[i].clientHeight;
    // At the start of the newsfeed
    if (
      !this.state.fetching
      && !this.state.start
      && target.scrollTop < delta
    ) {
      // TODO - fetch previous posts
      this.setState({fetching: true});
      log('Fetching previous posts');
      API.newsfeed.get({
        token: this.props.token,
        start_time: (this.state.posts[0].props as PostProps).data.date,
        end_time: this.state.prev_start[this.state.prev_start.length - 1],
        filters: Filter.post,
        count: this.props.update_count,
        fields: [
          'first_name',
          'last_name',
          'name',
          'photo_100'
        ]
      })
        .then(res => {
          log('Fetching done!');
          if (res.items.length === 0) {
            this.setState({start: true});
            return;
          }
          target.scrollIntoView({behavior: 'smooth', block: 'nearest'});
          this.setState({
            start: false,
            end: false,
            start_from: res.next_from,
            prev_start: this.state.prev_start.slice(0, this.state.prev_start.length - 2),
            posts: res.items.map<JSX.Element>(p => {
              let post = p as IPostNews;
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
                  key={post.post_id}
                  data={{
                    id: post.post_id,
                    attachments: post.attachments,
                    copy_history: post.copy_history,
                    date: post.date,
                    likes: post.likes,
                    text: post.text
                  }}
                  sources={sources}
                  user={res.profiles.find(user => user.id === post.source_id)}
                  group={res.groups.find(group => group.id === -post.source_id)}
                />
              );
            })
          })
        })
    }
  };

  componentDidUpdate = () => {
    setTimeout(
      () => this.setState({fetching: false}),
      3000,
    );
  };
  render = () => {
    if (this.state.posts.length < 0) return null;
    return (
      <div className='news-feed' onScroll={this.onScroll}>
        {this.state.posts}
      </div>
    );
  }
}

const log = Log(NewsFeed.name);
const info = infoLog(NewsFeed.name);
const error = errorLog(NewsFeed.name);
