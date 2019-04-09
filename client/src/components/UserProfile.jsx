import React from 'react'
import {
  getUser,
   } from '../services/user';
import {
   getUserPosts,
 } from '../services/post';

import PostsList from './PostsList'


class UserProfile extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      user: [],
      userPosts: [],
    }
  }

  async componentDidMount() {
     const id = await localStorage.getItem('id');
     const user = await getUser(id);

     this.setState({
       user: user.user,
     })
    await this.fetchUserPosts();
  }

  async fetchUserPosts() {
    const userPosts = await getUserPosts(this.state.user.id)
    this.setState({
      userPosts: userPosts
    })
  }

  render(props){
    return(
      <div>
      <div className="profile-banner" style={{backgroundImage: `url(${this.state.user.banner})`}}></div>
      <div className="profileImg" style={{backgroundImage: `url(${this.state.user.profile_pic})`}}></div>
      <h2>{this.state.user.name}</h2>
      <div>{this.state.user.location}</div>
      <div>{this.state.user.bio}</div>
      <PostsList
      posts={this.state.userPosts}
      />
      </div>


    )
  }
}




export default UserProfile;
