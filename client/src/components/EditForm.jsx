import React from 'react';
import Dropzone from 'react-dropzone';
import FilesBase64 from 'react-file-base64';
import {
    getPosts,
    updatePosts } from '../services/post';

class EditForm extends React.Component {
    constructor(props) {
       super(props)

       this.state = {
         posts:[],
         body: '',
         description: '',
         posted_by: '',
         filepath: '',
         uploadedFile: null,
       }
       this.onImageDrop = this.onImageDrop.bind(this)
       this.handlePostFormChange = this.handlePostFormChange.bind(this);
       this.handelEditPost = this.handelEditPost.bind(this);

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
         this.savePhoto();
       })
     }

    async savePhoto(){
    const userId = await localStorage.getItem('id');
    const postId = this.props.match.params.id
    const name = await localStorage.getItem('name');
    const data = {
      body: this.state.uploadedFile,
      }
    await updatePosts(userId, postId, data);
    }

     async handelEditPost(e){
       e.preventDefault();
       const userId = await localStorage.getItem('id');
       const postId = this.props.match.params.id
       const name = await localStorage.getItem('name');
       const data = {
         body: this.state.posts.filter(x=>(x.id === postId )).map(x=>(x.body)),
         description: this.state.description,
         posted_by: name
       }
       await updatePosts(userId, postId, data);
       const posts = await getPosts();
       this.setState({
         posts
       });
       this.props.history.push('/feed')
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
        <div>Edit Post</div>
        <form>

        <div {...props}
        className="profileImg"
        style={{backgroundImage: `url(${this.state.uploadedFile }`}}>
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
            onClick={this.handelEditPost}
            type="submit">Post</button>
        </form>
        </>
    )
  }
}

export default EditForm;
