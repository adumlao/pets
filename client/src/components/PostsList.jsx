import React from 'react';


const PostsList = (props) => {
  return(
  <div>
    {this.props.posts.map(x => (
      <div key={x.id}>
        <h1>{props.users.filter(user => (user.id === x.userId))[0]}</h1>
        <h2>{x.body}</h2>
        <p>{x.description}</p>
      </div>
    ))}
  </div>
)
}


export default PostsList
