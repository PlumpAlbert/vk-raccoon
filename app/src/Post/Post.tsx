import * as React from 'react'
import { IResponse } from '../API/wall/get';
import { IPost, IUser, IAttachment, AttachmentType, IGroup } from '../API/objects';

import './Post.css'

function attachment(data: IAttachment[]) {
  return data.map((item, i) => {
    switch (item.type) {
      case AttachmentType.album: {

        return <span key={i}>{item.type}</span>;
      }
      case AttachmentType.app: { return <span key={i}>{item.type}</span>; }
      case AttachmentType.audio: { return <span key={i}>{item.type}</span>; }
      case AttachmentType.doc: { return <span key={i}>{item.type}</span>; }
      case AttachmentType.graffiti: { return <span key={i}>{item.type}</span>; }
      case AttachmentType.link: { return <span key={i}>{item.type}</span>; }
      case AttachmentType.market: { return <span key={i}>{item.type}</span>; }
      case AttachmentType.market_album: { return <span key={i}>{item.type}</span>; }
      case AttachmentType.note: { return <span key={i}>{item.type}</span>; }
      case AttachmentType.page: { return <span key={i}>{item.type}</span>; }
      case AttachmentType.photo: { return <span key={i}>{item.type}</span>; }
      case AttachmentType.photos_list: { return <span key={i}>{item.type}</span>; }
      case AttachmentType.poll: { return <span key={i}>{item.type}</span>; }
      case AttachmentType.posted_photo: { return <span key={i}>{item.type}</span>; }
      case AttachmentType.pretty_cards: { return <span key={i}>{item.type}</span>; }
      case AttachmentType.sticker: { return <span key={i}>{item.type}</span>; }
      case AttachmentType.video: { return <span key={i}>{item.type}</span>; }
    }
  })
}

function renderPost(post: IPost, profiles: IUser[], groups: IGroup[]) {
  console.log(`Post from: ${post.from_id}`);
  let author = profiles.find(user => user.id === post.from_id);
  let group: IGroup | undefined;
  if (author === undefined) {
    group = groups.find(group => group.id === -post.from_id);
    if (group === undefined) {
      console.error('No author for post', post);
      return null;
    }
  }
  let date = new Date(post.date * 1000);
  return (
    <div key={post.id} className='post'>
      <div className="post-header">
        <img src={
          author
            ? author.photo_100
            : group ? group.photo_100 : ''
        } />
        <div className="post-header-author">
          <h1>{`${
            author
              ? author.first_name
              : group
                ? group.name
                : 'Unknown Source'
            }${author ? ' ' + author.last_name : ''}`
          }</h1>
          <p>{date.toLocaleString()}</p>
        </div>
      </div>
      <div className="post-content">
        {post.text ? <p>{post.text}</p> : null}
        {
          post.copy_history
            ? post.copy_history.map(v => renderPost(v, profiles, groups))
            : null
        }
        {
          post.attachments
            ? <div className="post-content-attachments">{attachment(post.attachments)}</div>
            : null
        }
      </div>
      <div className="post-footer">
      </div>
    </div>
  )
}

const Post = (props: IResponse) => {
  let { count, groups, items, profiles } = props;
  return items.map(post => {
    return renderPost(post, profiles, groups);
  });
}

export default Post;
