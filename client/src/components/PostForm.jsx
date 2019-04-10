import React from 'react';
import Dropzone from 'react-dropzone';
import FilesBase64 from 'react-file-base64';
import { withRouter } from 'react-router';

import {
    getPosts,
    createPost } from '../services/post';
import PostsList from './PostsList'

class PostForm extends React.Component {
  constructor(props) {
     super(props)

     this.state = {
      posts: [],
      body: '',
      description: '',
      posted_by: '',
      filepath: '',
      uploadedFile: null,
     };
     this.onImageDrop = this.onImageDrop.bind(this)
     this.handlePostFormChange = this.handlePostFormChange.bind(this);
     this.handleSubmitPost = this.handleSubmitPost.bind(this);
   }

   async componentDidMount(){
     const posts = await getPosts();
     this.setState({
       posts
     })
   }

   getFiles(filepath) {
   this.setState({
     filepath: filepath
   });
 }

  getBase64(item, cb) {
     let reader = new FileReader();
     reader.readAsDataURL(item);
     reader.onload = () => cb(reader.result);
     reader.onerror = function(e) {console.log("error", e)}
   }
   onImageDrop(files) {
     this.getBase64(files[0], (result) => {
       this.setState({
         uploadedFile: result
       })
     })
   }


      async handleSubmitPost(e){
        e.preventDefault();
        const id = await localStorage.getItem('id');
        const name = await localStorage.getItem('name');
        const data = {
          body: this.state.uploadedFile,
          description: this.state.description,
          posted_by: name
        }
        await createPost(id, data);
        const posts = await getPosts();
        this.setState({
          posts
        });

      }

      handlePostFormChange(e) {
       const { name, value } = e.target;
       this.setState(prevState => ({
           ...prevState.description,
           [name]: value
       }))
     }

  render(props){
    const {
      body,
      description,
    } = this.state
  return (
    <>
    <form>

    <div className="profileImg" style={{backgroundImage: `url(${this.state.uploadedFile ? this.state.uploadedFile : this.props.profile_pic}`}}>
    <Dropzone
      onDrop={acceptedFiles => {
        this.onImageDrop(acceptedFiles);
      }}
      multiple={false}>
      {({getRootProps, getInputProps, isDragActive}) => {
        return (
          <div {...getRootProps()} >
          <input {...getInputProps()} />
            { isDragActive ?
              <p>''</p> :
              <p> Drag 'n' drop image <br/> or click to select files </p>
            }
          </div>
          )
        }}
    </Dropzone>
    </div>

      <label htmlFor="description">What's on your mind?</label>
      <textarea
        rows = "5"
        cols = "50"
        name="description"
        id="description"
        value={description}
        onChange={this.handlePostFormChange} />

      <button
        onClick={this.handleSubmitPost}
        type="submit">Post</button>
    </form>
    <PostsList{...props}
    posts={this.state.posts}
    user={this.props.currentUser}
      />
    </>
  )
}
}

export default withRouter(PostForm);
