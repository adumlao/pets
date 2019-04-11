import React from 'react';
import Dropzone from 'react-dropzone';
import FilesBase64 from 'react-file-base64';
import { withRouter } from 'react-router';

import {
    deletePost,
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
     this.deleteThisPost = this.deleteThisPost.bind(this);
   }



   async deleteThisPost(id){
     const userId = await localStorage.getItem('id');
     await deletePost(userId, id);
     const posts = await getPosts();
     this.setState({
       posts
     });
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
    <div className="user-posts">

    <form className='update-form'>
    <div className="update-img" style={{backgroundImage: `url(${this.state.uploadedFile}`}}>

    <Dropzone
    onDrop={acceptedFiles => {
    this.onImageDrop(acceptedFiles);
      }}
    multiple={false}>
    {({getRootProps, getInputProps, isDragActive}) => {
    return (
      <div className="drop" {...getRootProps()} >
      <input {...getInputProps()} />
      { isDragActive ?
      <div className="drop-cross"> + </div> :
      <div className="drop-text"> Drag / Upload Photo </div>
      }
      </div>
      )
    }}
    </Dropzone>
    </div>

    <div className="update-text">
    <textarea
    className="update-blog"
    rows = "7"
    cols = "45"
    name="description"
    id="description"
    placeholder="Meow, Woof, Oink, Neigh, Chirp Away!"
    value={description}
    onChange={this.handlePostFormChange} />

    <button
    className="blog-button"
    onClick={this.handleSubmitPost}
    type="submit">Post</button>
    </div>
    </form>

    <PostsList{...props}
    posts={this.state.posts}
    user={this.props.currentUser}
    deleteThisPost={this.deleteThisPost} />

    </div>
  )
}
}

export default withRouter(PostForm);
