import * as React from 'react'
import { IResponse } from '../API/wall/get';
import { IPost, IAttachment, AttachmentType, SizeType } from '../API/objects';
import './Post.css'

class Post extends React.Component<IResponse> {
  render() {
    return this.props.items.map(post => {
      return this.renderPost(post);
    });
  }
  renderPost = (post: IPost) => {
    console.log(`Post from: ${post.from_id}`);
    let author = this.props.profiles.find(user => user.id === post.from_id);
    if (author === undefined) {
      var group = this.props.groups.find(group => group.id === -post.from_id);
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
              ? post.copy_history.map(v => this.renderRepost(v))
              : null
          }
          {
            post.attachments
              ? <div className="post-content-attachments">{this.renderAttachments(post.attachments)}</div>
              : null
          }
        </div>
        <div className="post-footer">
        </div>
      </div>
    )
  }
  renderRepost = (post: IPost) => {
    console.log(`Reposted from: ${post.from_id}`);
    let author = this.props.profiles.find(user => user.id === post.from_id);
    if (author === undefined) {
      var group = this.props.groups.find(group => group.id === -post.from_id);
      if (group === undefined) {
        console.error('No author for post', post);
        return null;
      }
    }
    let date = new Date(post.date * 1000);
    return (
      <div key={post.id} className='post-inner'>
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
              ? post.copy_history.map(v => this.renderRepost(v))
              : null
          }
          {
            post.attachments
              ? <div className="post-content-attachments">{this.renderAttachments(post.attachments)}</div>
              : null
          }
        </div>
      </div>
    )
  }
  renderAttachments = (data: IAttachment[]) => {
    return data.map((item, ix) => {
      switch (item.type) {
        case AttachmentType.photo: {
          if (item.photo === undefined) return console.error('item.photo is not defined', item);
          let photo = item.photo.sizes[item.photo.sizes.length - 1];
          let scale = 477 / photo.width;
          return <img
            key={item.photo.access_key}
            src={photo.url}
            onClick={(e) => {
              e.preventDefault();
              console.log(photo);
            }}
          />;
        }
        default:
          return <span>{item.type}</span>
      }
    })
  }
}


export default Post;
