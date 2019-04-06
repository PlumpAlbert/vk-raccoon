import * as React from 'react'
import { IResponse } from '../API/wall/get';
import { IPost, IAttachment, AttachmentType, IPhotoAttachment, IAudioAttachment } from '../API/objects';
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
    let audio = this.renderAudios(
      data.filter(item => item.type === AttachmentType.audio ? item : null) as {
        type: AttachmentType.audio,
        audio: IAudioAttachment
      }[]
    );
    let photos = this.renderPhotos(
      data.filter(item => item.type === AttachmentType.photo ? item : null) as {
        type: AttachmentType.photo,
        photo: IPhotoAttachment
      }[]
    );
    return [photos].concat(audio);
  }
  renderPhotos = (photos: { type: AttachmentType.photo, photo: IPhotoAttachment }[]) => {
    switch (photos.length) {
      case 1:
      case 2:
      case 3:
      case 4: {
        let left = 1, right = 0;
        switch (photos.length) {
          case 2: { right = 1; } break;
          case 3: { right = 2; } break;
          case 4: { left = right = 2; } break;
          default: break;
        }
        return (
          <table className="photo-attachment">
            <tbody>
              <tr>
                <td>{
                  (function () {
                    let nodes = [];
                    for (let i = 0; i < left; i++) {
                      let photo = photos[i].photo;
                      nodes.push(<img
                        key={photo.id}
                        src={photo.sizes[photo.sizes.length - 1].url}
                        onClick={(e) => {
                          e.preventDefault();
                          console.log(photo);
                        }}
                      />);
                    }
                    return nodes;
                  })()
                }</td>
                {
                  right > 0
                    ? <td>{
                      (function () {
                        let nodes = [];
                        for (let i = 0; i < right; i++) {
                          let photo = photos[i * left + right].photo;
                          nodes.push(<img
                            key={photo.id}
                            src={photo.sizes[photo.sizes.length - 1].url}
                            onClick={(e) => {
                              e.preventDefault();
                              console.log(photo);
                            }}
                          />);
                        }
                        return nodes;
                      })()
                    }</td>
                    : null
                }
              </tr>
            </tbody>
          </table>
        );
      }
      case 5:
      case 6:
      case 7:
      case 8:
      case 9:
      case 10: {
        let up = 2, down = 3;
        switch (photos.length) {
          case 6: { up = 3; } break;
          case 7: { up = 3; down = 4 } break;
          case 8: { up = 4; down = 4 } break;
          case 9: { up = 2; down = 7; } break;
          case 10: { up = 2; down = 8; } break;
          default: break;
        }
        return (
          <table className="photo-attachment">
            <tbody>
              <tr>
                {
                  (function () {
                    let nodes = [];
                    for (let i = 0; i < up; i++) {
                      let photo = photos[i].photo;
                      nodes.push(
                        <td key={`up${i}`}>
                          <img
                            key={photo.access_key}
                            src={photo.sizes[photo.sizes.length - 1].url}
                            onClick={(e) => {
                              e.preventDefault();
                              console.log(photo);
                            }}
                          />
                        </td>
                      );
                    }
                    return nodes;
                  })()
                }
              </tr>
              <tr>
                {
                  (function () {
                    let nodes = [];
                    for (let i = 0; i < down; i++) {
                      let photo = photos[up + i].photo;
                      nodes.push(
                        <td key={`down${i}`}>
                          <img
                            key={photo.access_key}
                            src={photo.sizes[photo.sizes.length - 1].url}
                            onClick={(e) => {
                              e.preventDefault();
                              console.log(photo);
                            }}
                          />
                        </td>
                      );
                    }
                    return nodes;
                  })()
                }
              </tr>
            </tbody>
          </table>
        );
      }
      default: return null;
    }
  }
  renderAudios = (audios: { type: AttachmentType.audio, audio: IAudioAttachment }[]) => {
    return (
      <div className="audio-list">
        {
          audios.map(({ type, audio }) => {
            return (
              <div className='track'>
                <span className='fa fa-play' />
                <div className='track-info'>
                  <h1 className='track-title'>{audio.title}</h1>
                  <p className='track-artist'>{audio.artist}</p>
                </div>
              </div>
            );
          })
        }
      </div>
    );
  }
}


export default Post;
