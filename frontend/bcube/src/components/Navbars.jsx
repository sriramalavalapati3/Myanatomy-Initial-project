
import React,{Component} from 'react'
import "./styles/Navbars.css"
import { connect } from 'react-redux';
import {searchVideo} from '../Redux/searchReducer/action'
import { AiOutlineUserAdd } from "react-icons/ai";
import {withNavigateHook} from './Navigate'

const mapStateToProps=(state)=>{
  console.log(state)
  return{
   searchVideos: state.searchReducer.searchVideos,
    isLoading: state.searchReducer.isLoading,
    isLogin:state.loginReducer.isLogin
  }
}





class Navbars extends Component {
 constructor(props){
super(props);
this.state = {
  searchInput: ''
}
this.handleChange=this.handleChange.bind(this);
this.handleSearch=this.handleSearch.bind(this);
this.redirect=this.redirect.bind(this)
 }

handleChange=(e)=>{

  this.setState({ searchInput: e.target.value });
}

handleSearch=()=>{
  const {searchInput}=this.state
  const token=sessionStorage.getItem('token')
 
  if (searchInput.trim() !== ''&&token) {
    
  this.props.searchVideo({searchInput,token});
   
  }
}

redirect(){
  this.props.navigation('/Dashboard')
}

 
  render(){
    const {searchVideos,isLogin}=this.props
   console.log(searchVideos)
  const token=sessionStorage.getItem("token")
    return (
      <div>
          <div id="Nav">
          <img src="https://drive.google.com/uc?export=download&id=1CyobKw-T6LQbv_hdRqAcgxSX-o689QuR" alt="Logo" onClick={this.redirect}/>
          <div className="search-box">
  <input  type="text" placeholder='search' onChange={this.handleChange}/>
  <button id="s-btn" onClick={this.handleSearch}>🔍</button>
          </div>
          <button id="l-btn" onClick={this.props.toggleLoginForm}><AiOutlineUserAdd/>{isLogin||token?"Logout":"Login"}</button>
          </div>
      </div>)
  }
  
  
}

const mapDispatchToProps = (dispatch) => {
  return {
    searchVideo: (obj) => dispatch(searchVideo(obj)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withNavigateHook(Navbars))
