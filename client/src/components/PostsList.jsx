import React from 'react';


const PostsList = (props) =>  {
    return(
  <div>
    {props.posts.map(x => (
      <div key={x.id}>
        <h2>{x.posted_by}</h2>
        <h3>{x.body}</h3>
        <p>{x.description}</p>
      </div>
    ))}
  </div>
)
}

export default PostsList
