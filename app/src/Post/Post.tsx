import * as React from 'react'
import { IResponse } from '../API/wall/get';

import './Post.css'

const Post = (props: IResponse) => {
  let { count, groups, items, profiles } = props;
  return items.map(post => {
    let author = profiles.filter(user => user.id === post.from_id)[0];
    let date = new Date(post.date * 1000);
    return (
      <div className='post'>
        <div className="post-header">
          <img src={author.photo_100} />
          <div className="post-header-author">
            <h1>{`${author.first_name} ${author.last_name}`}</h1>
            <p>{date.toLocaleString()}</p>
          </div>
        </div>
        <div className="post-content">
          {post.text ? <p>{post.text}</p> : null}
          <div className="post-content-attachments">
          </div>
        </div>
        <div className="post-footer">
        </div>
      </div>
    )
  });
}

export default Post;
