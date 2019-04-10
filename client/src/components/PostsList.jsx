import React from 'react';
import { Route, Link, Redirect } from 'react-router-dom';

const PostsList = (props) =>  {
    return(
  <div>
    {props.posts.map(x => (
      <div key={x.id}>
        <h2>{x.posted_by}</h2>
          {x.body === null ? null : <div className="profileImg" style={{backgroundImage: `url(${x.body})`}}></div>}
        <p>{x.description}</p>

        {props.user === x.user_id ?
          <Link to={`/post/${x.id}/edit`}>Edit Post</Link>

          : null
        }

      </div>
    ))}
  </div>
)
}

export default PostsList
