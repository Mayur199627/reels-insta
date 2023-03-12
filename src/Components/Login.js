import React, { Component } from 'react';
import './Login.css';
import { CarouselProvider, Slider, Slide, Image } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import { Link } from 'react-router-dom';
import image1 from './images/image1.png';
import image2 from './images/image2.png';
import image3 from './images/image3.png';
import image4 from './images/image4.png';
import { auth,database } from './firebase';
import { getDocs, query, where } from 'firebase/firestore';
import { signInWithEmailAndPassword } from 'firebase/auth';

export default class Login extends Component {
    constructor(){
        super();
        this.state = {
            email:"",
            password:"",
            error: "",
            userData:""
        }
    }

    handleSubmit = () =>{
        if (this.state.email === "" || this.state.password === "") {
            this.setState({ error: "Please Fill All Feilds" });
            setTimeout(() => {
              this.setState({ error: "" });
            }, 2000)
            return
          }
          else{            
        signInWithEmailAndPassword(auth,this.state.email,this.state.password).then((responce)=>{
            const user = responce.user;
            this.setState({userData:user});
            let uid = user.uid;
            // let refDoc = doc(fstore, "users", uid)
            let q = query(database.users, where("uid", "==", uid))
            getDocs(q).then((data)=>{
                console.log(data.docs[0].data())
                localStorage.setItem("user",JSON.stringify(data.docs[0].data()))
                window.location.href = "/" 
            }).catch((err)=>{
                console.log(err)
            })
            console.log(user)
        })
        .catch((err)=>{
            this.setState({error:"User Not Register Please Signup"})
        })
          }
    }

    render() {
        return (
            <div className='login_cont'>
                <div className="login_cont_left" style={{ backgroundImage: `url(./images/image-back.png)`, backgroundSize: '100% 100%' }}>
                    <CarouselProvider className='slider-images'
                        totalSlides={4}
                        visibleSlides={1}
                        naturalSlideHeight={400}
                        naturalSlideWidth={200}
                        isPlaying={true}
                        interval={3000}
                        infinite={true}
                        touchEnabled={false}>
                        <Slider>
                            <Slide index={0}><Image src={image1}></Image></Slide>
                            <Slide index={1}><Image src={image2}></Image></Slide>
                            <Slide index={2}><Image src={image3}></Image></Slide>
                            <Slide index={3}><Image src={image4}></Image></Slide>
                        </Slider>
                    </CarouselProvider>
                </div>
                <div className="login_cont_right">
                    <div className="login_details_cont">
                        <div className="insta_logo">
                            <img src="./images/logo.png" alt="logo" />
                        </div>

                        <div className="user_details_login">
                            <input type="Email" placeholder='Phone number, username, or email' onChange={(e)=>{this.setState({email:e.target.value})}}/>
                            <input type="password" placeholder='Password' onChange={(e)=>{this.setState({password:e.target.value})}}/>
                            <input type="Submit" value="Log in" className='submitBtn' onClick={this.handleSubmit}/>
                            <p className='show_error'>{this.state.error}</p>
                        </div>

                        <div className="other_type_login">
                            <p>----------------------OR------------------------</p>
                            <p className='login_with_fb'>Login With Facebook</p>
                            <p>Forgot Passward?</p>
                        </div>
                    </div>
                    <div className="signup_link">
                        <p>Don't have an account? <Link to='/signup'>Sign up</Link></p>
                    </div>
                </div>

            </div>
        )
    }
}
