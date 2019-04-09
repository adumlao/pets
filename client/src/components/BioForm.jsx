import React from 'react';
import { withRouter } from 'react-router';
import {
  getUser,
  updateUser } from '../services/user'

class BioForm extends React.Component {
    constructor(props) {
      super(props)

       this.state = {
         user: [],
         bioForm: {
           location: '',
           bio: '',
         }
       }
       this.handleBioFormChange = this.handleBioFormChange.bind(this);
       this.submitBio = this.submitBio.bind(this);
     }

     handleBioFormChange(e) {
      const { name, value } = e.target;
      this.setState(prevState => ({
        bioForm: {
          ...prevState.bioForm,
          [name]: value
        }
      }))
    }

     async submitBio(e){
       e.preventDefault();
       const id = await localStorage.getItem('id');
       const updated = await updateUser(id, this.state.bioForm);
       this.props.fetchUser();
       this.props.history.push('/userprofile')
      }

     render(){
     const {
      location,
      bio
    } = this.state.bioForm;

  return (
    <form className="bio-form"onSubmit={this.submitBio}>
      <label htmlFor="location">Location</label>
      <input
      type="text"
      name="location"
      value={location}
      id="location"
      onChange={this.handleBioFormChange} />
      <label htmlFor="bio">Bio</label>
      <textarea
        rows = "5"
        cols = "50"
        name="bio"
        id="bio"
        value={bio}
        onChange={this.handleBioFormChange} />
      <button>Post</button>
    </form>
  )
}
}

export default withRouter(BioForm);
