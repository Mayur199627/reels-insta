import React, { Component } from 'react'
import { database } from './firebase'
import { getDocs } from 'firebase/firestore';
export default class Posts extends Component {
constructor(){
    super();
    this.state = {
        post:[]
    }
}
componentDidMount(){
    let postArr = [];
    const subArr = getDocs(database.posts).then((res)=>{
        console.log(res.docs[0].data());
        this.setState({post:res.docs})
    }).catch((err)=>{
        console.log(err)
    })
}
    render() {
    return (
      <div>
        {this.state.post.map((ele)=>{
            const data = ele.data()
            return (
            <div key={ele.id}> 
            <video src={data.pUrl} controls={data.pId}></video>
            <h1>{data.email}</h1>
            </div>)
        })}
      </div>
    )
  }
}
