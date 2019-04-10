import React from 'react';


const PostsList = (props) =>  {
    return(
  <div>
    {props.posts.map(x => (
      <div key={x.id}>
        <h2>{x.posted_by}</h2>
          {x.body === null ? null : <div className="profileImg" style={{backgroundImage: `url(${x.body})`}}></div>}
        <p>{x.description}</p>
      </div>
    ))}
  </div>
)
}

export default PostsList
