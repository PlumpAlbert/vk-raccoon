import * as React from 'react'
import Conversations from './Conversation';
import './messages.css';

const Messages = React.memo<{ token: string }>(({ token }) => {
  return (
    <div className="messages-page">
      <Conversations token={token} />
      <div className="messages"></div>
    </div>
  )
});

export default Messages;
