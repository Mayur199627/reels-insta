import React, { Component } from 'react'
import { database } from './firebase'
import { getDocs } from 'firebase/firestore';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import Like from './Like';

export default class Posts extends Component {
constructor(){
    super();
    this.state = {
        post:[],
        userprofile : {},
    }
}
componentDidMount(){
    getDocs(database.posts).then((res)=>{
        // console.log(res.docs[0].data());
        this.setState({post:res.docs})
    }).catch((err)=>{
        console.log(err)
    })
    const tempUser = JSON.parse(localStorage.getItem("user"))
    this.setState({userprofile:tempUser})  
}
    render() {
    return (
      <div className='main-page-reel'>
        {this.state.post.map((ele)=>{
            const data = ele.data()
            return (
            <div key={ele.id}> 
            <h1>{data.uName}</h1>
            <div className="cont-reels">
            <video src={data.pUrl} controls={data.pId} className="single-reel"></video>
            <div className="like-comment-icon">
                <Like user = {this.state.userprofile} postData = {data} id={ele.id}/>
                <ChatBubbleOutlineIcon />
            </div>
            </div>
            </div>)
        })}
      </div>
    )
  }
}
