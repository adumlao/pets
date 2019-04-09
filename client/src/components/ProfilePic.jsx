import React from 'react';
import Dropzone from 'react-dropzone';
import FilesBase64 from 'react-file-base64';
import {
  updateUser } from '../services/user'

export default class ProfilePicture extends React.Component {
  constructor(props) {
     super(props)

     this.state = {
       currentUser: null,
       filepath: '',
       uploadedFile: null,
     };
     this.onImageDrop = this.onImageDrop.bind(this)
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
       this.saveProfilePic();
     })
   }

   async saveProfilePic(){
       const id = await localStorage.getItem('id');
       const data = {profile_pic: this.state.uploadedFile};
       await updateUser(id, data);
     }



  render(){
    return (
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
    </form>
    )
  }
}
