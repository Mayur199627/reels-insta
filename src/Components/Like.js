import React, { Component } from 'react'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { updateDoc, doc } from 'firebase/firestore';
import { fstore } from './firebase'

export default class Like extends Component {
    constructor(){
        super()
        this.state = {
            like : false,
        }
    }

    handleLike =() =>{
      // console.log("hello")
        if(this.state.like === true){
            let tempArr = this.props.postData.likes.filter((el) => el !== this.props.user.uid)
            let tempRef = doc(fstore, "posts", this.props.id);
            updateDoc(tempRef, {likes:tempArr}).then((res) =>{
              console.log(res)
              this.setState({like:false})
            }).catch((err)=>{
              console.log(err)
            })
        }
        else{
            let tempArr = [...this.props.postData.likes, this.props.user.uid]
            let tempRef = doc(fstore, "posts", this.props.id);
            updateDoc(tempRef, {likes:tempArr}).then((res) =>{
              console.log(res)
              this.setState({like:true})
            }).catch((err)=>{
              console.log(err)
            })

        }
    }

    componentDidCatch(){
      // console.log(this.props.postData.likes)
      let check = this.props.postData.likes.includes(this.props.user.uid) ? true : false;
      this.setState({like:check})
    }
  render() {

    return (
      <div>
      {this.state.like === true ? <FavoriteBorderIcon color='error' onClick={this.handleLike}/> : <FavoriteBorderIcon onClick={this.handleLike}/>}
      </div>
    )
  }
}
