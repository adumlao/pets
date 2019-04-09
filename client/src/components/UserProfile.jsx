import React from 'react'
import {
  getUser } from '../services/user'

class UserProfile extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      user: [],
    }
  }

  async componentDidMount() {
     const id = await localStorage.getItem('id');
     const user = await getUser(id);
     this.setState({
       user: user.user
     })
  }

  render(){
    return(
      <div>
      <div className="profile-banner" style={{backgroundImage: `url(${this.state.user.banner})`}}></div>
      <div className="profileImg" style={{backgroundImage: `url(${this.state.user.profile_pic})`}}></div>
      <div>{this.state.user.name}</div>
      <div>{this.state.user.location}</div>
      <div>{this.state.user.bio}</div>
      </div>


    )
  }
}




export default UserProfile;
