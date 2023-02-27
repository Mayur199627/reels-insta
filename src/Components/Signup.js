import React, { Component } from 'react'
import './singup.css'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase';


export default class Signup extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      userImg: "",
      error: "",
      userData:""
    }
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
      createUserWithEmailAndPassword(auth, this.state.email, this.state.password).then((res) => {
        const user =res.user
        localStorage.setItem("user",JSON.stringify(user))
        this.setState({userData:user});
        this.setState({ signupUser: false })
        window.location.href = "/"
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
              <input type="text" placeholder='Full Name' />
              <input type="Email" placeholder='Phone number, username, or email' onChange={(e) => { this.setState({ email: e.target.value }) }} />
              <input type="password" placeholder='Password' onChange={(e) => { this.setState({ password: e.target.value }) }} />
              <input type="file" id="user_img"onChange={(e) => { this.setState({ userImg: e.target.value }) }} />
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
