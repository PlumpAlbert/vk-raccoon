import * as React from 'react'
import { IPost, IAttachment, AttachmentType, IPhotoAttachment, IAudioAttachment, IGroup, IUser } from '../API/objects';
import './Post.css'

type TSource = ({
  type: 'IUser',
  data: IUser
} | {
  type: 'IGroup',
  data: IGroup
})[];

export interface IProps {
  user?: IUser;
  group?: IGroup;
  data: IPost;
  sources: TSource;
}

const Post: React.FC<IProps> = props => {
  let { data, user, group, sources, } = props;
  console.log(`#POST > Rendering post #${data.id}`, new Date(Date.now()).toLocaleTimeString());
  return renderPost(data, sources, user, group, false);
};
function renderPost(post: IPost, sources: TSource, user?: IUser, group?: IGroup, inner: boolean = false) {
  let date = new Date(post.date * 1000);
  return (
    <div key={post.id} className={`post${inner ? '-inner' : ''}`}>
      <div className="post-header">
        <img src={
          user
            ? user.photo_100
            : group ? group.photo_100 : ''
        } />
        <div className="post-header-author">
          <h1>{`${
            user !== undefined
              ? user.first_name
              : group !== undefined
                ? group.name
                : 'Unknown Source'
            }${user ? ' ' + user.last_name : ''}`
          }</h1>
          <p>{date.toLocaleString()}</p>
        </div>
      </div>
      <div className="post-content">
        {post.text ? <p>{post.text}</p> : null}
        {
          post.copy_history
            ? post.copy_history.map((repost, i) => {
              return renderPost(
                repost,
                sources,
                sources[i].type === 'IUser' ? sources[i].data as IUser : undefined,
                sources[i].type === 'IGroup' ? sources[i].data as IGroup : undefined,
                true
              )
            })
            : null
        }
        {
          post.attachments
            ? <div className="post-content-attachments">{renderAttachments(post.attachments)}</div>
            : null
        }
      </div>{
        !inner
          ? <div className="post-footer">
          </div>
          : null
      }</div>
  )
}
function renderAttachments(data: IAttachment[]) {
  let audio = renderAudios(
    data.filter(item => item.type === AttachmentType.audio ? item : null) as {
      type: AttachmentType.audio,
      audio: IAudioAttachment
    }[]
  );
  let photos = renderPhotos(
    data.filter(item => item.type === AttachmentType.photo ? item : null) as {
      type: AttachmentType.photo,
      photo: IPhotoAttachment
    }[]
  );
  return [photos, audio];
}
function renderPhotos(photos: { type: AttachmentType.photo, photo: IPhotoAttachment }[]) {
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
        <table key='table' className="photo-attachment">
          <tbody>
            <tr>
              <td key='left-column'>{
                (function () {
                  let nodes = [];
                  for (let i = 0; i < left; i++) {
                    let photo = photos[i * left].photo;
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
                  ? <td key='right-column'>{
                    (function () {
                      let nodes = [];
                      for (let i = 0; i < right; i++) {
                        let photo = photos[i * left + 1].photo;
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
        <table key='table' className="photo-attachment">
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
function renderAudios(audios: { type: AttachmentType.audio, audio: IAudioAttachment }[]) {
  if (audios.length === 0) return null;
  return (
    <div key='audio-list' className="audio-list">
      {
        audios.map(({ audio }) => {
          return (
            <div key={audio.id} className='track'>
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


export default Post;
