import * as React from 'react'
import API from '../API';
import { UserPeer, IConversation, IUser, IGroup, ChatPeer, GroupPeer } from '../API/objects';

interface IState {
  loading: boolean;
  end: boolean;
  conversations: JSX.Element[]
}

const log = function (...args: any[]) {
  args.unshift('#Conversation >');
  args.push(new Date(Date.now()).toLocaleTimeString());
  console.log.apply(console, [args]);
}

export default class Conversations extends React.Component<{ token: string }, IState> {
  componentWillMount() {
    this.setState({ loading: true });
    API.messages.getConversations({
      token: this.props.token,
      count: 10,
      extended: true,
      offset: 0
    }).then(res => {
      log('Fetched initial conversations');
      this.setState({
        loading: false,
        end: res.count === res.items.length,
        conversations: res.items.map(({ conversation, last_message }) => {
          if (conversation.peer instanceof UserPeer) {
            return <Conversation
              last_message={last_message}
              data={conversation}
              user={res.profiles.find(user => user.id === conversation.peer.local_id)}
            />
          }
          if (conversation.peer instanceof GroupPeer) {
            return <Conversation
              last_message={last_message}
              data={conversation}
              group={res.groups.find(group => group.id === conversation.peer.local_id)}
            />
          }
          if (conversation.peer instanceof ChatPeer) {
            return <Conversation
              last_message={last_message}
              data={conversation}
            />
          }
          return <span>EMAIL</span>
        })
      })
    });
  }
  shouldComponentUpdate(nextProps: { token: string }, nextState: IState) {
    if (nextState.loading) return false;
    return nextState !== this.state;

  }
  render() {
    if (this.state.loading) return;
    log('Rendering Conversations')
    let { conversations } = this.state;
    return (
      <div className="conversation-wrapper">{
        conversations
          ? conversations
          : <h1>You don't have any conversation</h1>
      }</div>
    );
  }
}


interface IProps {
  data: IConversation;
  last_message: any;
  user?: IUser;
  group?: IGroup;
}
const Conversation = React.memo<IProps>(({ data, user, group, last_message }) => {
  log('Rendering conversation with', data.peer);
  if (user) {
    return (
      <div className="conversation">
        <img src={user.photo_100} />
        <div className="conversation-info">
          <h1>{`${user.first_name} ${user.last_name}`}</h1>
          <p>{last_message.text}</p>
        </div>
      </div>
    )
  }
  if (group) {
    return (
      <div className="conversation">
        <img src={group.photo_100} />
        <div className="conversation-info">
          <h1>{group.name}</h1>
          <p>{last_message.text}</p>
        </div>
      </div>
    )
  }
  if (data.chat_settings) {
    return (
      <div className="conversation">
        <img src={data.chat_settings.photo.photo_100} />
        <div className="conversation-info">
          <h1>{data.chat_settings.title}</h1>
          <p>{last_message.text}</p>
        </div>
      </div>
    )
  }
  else return <span>Something is not right :c</span>;
});
