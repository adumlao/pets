import React from 'react';
import { Route, Link, Redirect } from 'react-router-dom';

const PostsList = (props) =>  {
    return(
    <div className="feed">
    {props.posts.map(x => (
      <div
      className="post-block"
      key={x.id}>

        <div className='post-by'>{x.posted_by}</div>

        <div className="post-date">On: {(x.created_at).split("T")[0]} </div>

        <div className="post-caption">{x.description}</div>

        {x.body === null ? null :
        <div className="post-image" style={{backgroundImage: `url(${x.body})`}}></div>}

        {props.user === x.user_id ?
        <div className="edits">
        <Link className="edit-buttons" to={`/post/${x.id}/edit`}>Edit</Link>
        <div className="edit-buttons" onClick={() => props.deleteThisPost(x.id)}>Delete</div>
        </div>
        : null
        }

      </div>
    ))}
    </div>
  )
}

export default PostsList
