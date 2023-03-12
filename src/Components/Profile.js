import React, { Component } from 'react'
import './profile.css'
import { database } from './firebase'
import { getDocs,query, where } from 'firebase/firestore';

export default class Profile extends Component {
  constructor(){
    super();
      this.state = {
        userprofile : {},
        reels : [],
    }
  }

  
componentDidMount(){
  const tempUser = JSON.parse(localStorage.getItem("user"))
  this.setState({userprofile:tempUser})
  let q = query(database.posts, where("uId", "==", tempUser.uid))
            getDocs(q).then((data)=>{
                console.log(data.docs[0].data())
                this.setState({reels:[...data.docs]})
                // localStorage.setItem("user",JSON.stringify(data.docs[0].data()))
                // window.location.href = "/" 
            }).catch((err)=>{
                console.log(err)
            })
}

  render() {
    return (
      <>
      <div className='user-details'>
        <div className="userImg">
          <h1>User Profile</h1>
          <img src={this.state.userprofile.profileUrl} alt="user-image" className='user-img'/>
        </div>
        <div className="user-name">
          <h2>User Name : {this.state.userprofile.fullname}</h2>
          <h3>User Email : {this.state.userprofile.email}</h3>
        </div>
      </div>
      <div className="reels">
      <h2>Reels</h2>
      <div className="reels-list">
        {this.state.reels.map((ele)=>{
            const data = ele.data()
            return (
            <div key={ele.id}> 
            <video src={data.pUrl} controls={data.pId} className="single-reel"></video>
            </div>)
        })}
      </div>
      </div>
</>
    )
  }
}
