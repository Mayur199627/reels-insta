import React, { Component } from 'react'
import './singup.css'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { database,storage} from './firebase';
import { addDoc } from 'firebase/firestore';
export default class Signup extends Component {
  constructor() {
    super();
    this.state = {
      name:"",
      email: "",
      password: "",
      userImg: "",
      error: "",
      userData:""
    }
  }

  handleImgupload = (file) =>{
    this.setState({userImg:file})
  }

  handleSignup = () => {
    if (this.state.email === "" || this.state.username === "" || this.state.password === "") {
      this.setState({ error: "Please Fill All Feilds" });
      setTimeout(() => {
        this.setState({ error: "" });
      }, 2000)
      return
    }
    else {
      this.setState({ signupUser: true })
      createUserWithEmailAndPassword(auth, this.state.email, this.state.password, this.state.userImg, this.state.name).then((res) => {
        const user =res.user
        const uid = res.user.uid;
        const uploadRef = ref(storage,`/users/${uid}/profileImage`)
        const uploadTask = uploadBytesResumable(uploadRef,this.state.userImg)
        const f1 =(snapshot) =>{
          // while running
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("upload is "+ progress + " % done")

        }
        const f2 =(error) =>{
          // error
          this.setState({error:error,loading: false})
          setTimeout(()=>{
              this.setState({error:""})
          },2000)
        }
        const f3 =() =>{
          // upload completed
          getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl)=>{
            console.log(downloadUrl)
            let obj = {
              uid:uid,
              email:this.state.email,
              fullname:this.state.name,
              profileUrl:downloadUrl,
              creationDate:Date.now()
            }
            
            addDoc(database.users, obj).then((refrences) =>{
              console.log("user update successfully")
              console.log(refrences)
              localStorage.setItem("user",JSON.stringify(obj))
              window.location.href = "/"
          })
          }).catch((error)=>{
            console.log(error)
          })
        }
        uploadTask.on("state_changed", f1,f2,f3)
        this.setState({userData:user});
        this.setState({ signupUser: false })
      }).catch((err) => {
        const errMsg = err.message;
        this.setState({ signupUser: false, error: errMsg })
      })
    }
    // this.resetInput()
  }
  
  render() {
    return (
      <div>
        <div className="signup_cont">
          <div className="signup_details_cont">
            <div className="insta_logo">
              <img src="./images/logo.png" alt="logo" />
            </div>
            <div className="other_type_login">
              <p>Sign up to see photos and videos from your friends.</p>
              <p className='login_with_fb'>Login With Facebook</p>
              <p>----------------------OR------------------------</p>
            </div>

            <div className="user_details_signup">
              <input type="text" placeholder='Full Name' onChange={(e) => { this.setState({ name: e.target.value }) }} />
              <input type="Email" placeholder='Phone number, username, or email' onChange={(e) => { this.setState({ email: e.target.value }) }} />
              <input type="password" placeholder='Password' onChange={(e) => { this.setState({ password: e.target.value }) }} />
              <input type="file" id="user_img" placeholder='Select Your Image' accept='image/*' onChange={(e)=>{this.handleImgupload(e.target.files[0])}} />
              <p style={{ fontSize: '13px' }}>People who use our service may have uploaded your contact information to Instagram. Learn More</p>
              <p style={{ fontSize: '13px' }}>By signing up, you agree to our Terms , Privacy Policy and Cookies Policy .</p>
              <input type="Submit" value='Sign up' className='submitBtn' onClick={this.handleSignup} disabled={this.state.signupUser} />
              <p className='show_error'>{this.state.error}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
