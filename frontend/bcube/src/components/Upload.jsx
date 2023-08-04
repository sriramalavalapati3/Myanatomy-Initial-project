import React, { Component } from 'react'
import { AiOutlineCloudUpload } from "react-icons/ai";
import './styles/Upload.css'
import {uploadVideo} from '../Redux/uploadReducer/action'
import { connect } from 'react-redux';
import {withNavigateHook} from './Navigate'

const mapStateToProps=(state)=>{
  return {
    isLoading:state.uploadReducer.isLoading,
    isError:state.uploadReducer.isError,
    isLogin: state.loginReducer.isLogin
  }
}



 class Upload extends Component {

  constructor(props) {
    super(props);
    this.state = {
      videoUrl: '',
      videoTitle: '',
      videoDesc: ''
    };
    
  }

 
 
onChangeurl=(e)=>{
  
  this.setState({videoUrl : e.target.value })
}
onChangetitle=(e)=>{
  
  this.setState({videoTitle : e.target.value })
}
onChangedesc=(e)=>{
 
  this.setState({ videoDesc: e.target.value })
}



  onSubmit=(e)=>{
  e.preventDefault()
  const token=sessionStorage.getItem("token")
  if(token)
  {
   const {videoUrl, videoTitle,videoDesc}=this.state
   const {isError}=this.props
    this.props.uploadVideo({videoUrl, videoTitle,videoDesc,token})
    this.setState({
       videoUrl: '',
       videoTitle: '',
      videoDesc: '',
              }
);


if (!isError) {
  console.log(this.props)
 this.props.navigation('/Dashboard')
}
  }
}


  render() {
    const token=sessionStorage.getItem("token")

    const { videoUrl, videoTitle, videoDesc } = this.state;
const{isLoading,isError,loginForm}=this.props
let Disabled=!videoUrl || !videoTitle || !videoDesc
if(!token)
  {
    if(!loginForm){
      return <div className="centered-message"><h1>Please Login to Your Account</h1></div>
    }
  }
 
  if (!token) {
    // If there's no token, return null to prevent rendering the component
    return null;
  }
  
    return (
      <div id="uploadform"> 
        <h1>Upload Video</h1>
        <form action="" onSubmit={this.onSubmit}>
          <label htmlFor="videodesc">video Url</label><br />
            <input type="text" id="videourl" placeholder='videoUrl'     value={videoUrl} onChange={this.onChangeurl}/> <br />
            <label htmlFor="">video Title</label><br />
            <input type="text" id="videotitle" placeholder='Title' value={videoTitle} maxLength={20} onChange={this.onChangetitle} /><br />
            <label htmlFor="">video Description</label><br />
            <input type="text" id="videodesc" placeholder='Description' value={videoDesc} onChange={this.onChangedesc} /><br />
            <button
            type="submit"
            className={`upload-button ${isError ? 'red' : Disabled ? 'upload-button-disabled' : 'green'}`}
            disabled={Disabled}
          >
            <AiOutlineCloudUpload />
            {isLoading ? 'uploading...' : 'upload'}
          </button>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    uploadVideo: (obj) => dispatch(uploadVideo(obj)),
  };
};




  
export default connect(mapStateToProps, mapDispatchToProps)(withNavigateHook(Upload))




