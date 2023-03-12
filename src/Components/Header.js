import { Button } from '@mui/material'
import React, { Component } from 'react'
import './Header.css';
import { Link } from 'react-router-dom';
import { auth } from './firebase';
import { signOut } from 'firebase/auth';

export default class Header extends Component {
    constructor(){
        super();
        this.state = {
            userprofile : {},
        }
    }
componentDidMount(){
    const tempUser = JSON.parse(localStorage.getItem("user"))
    this.setState({userprofile:tempUser})
}

handleSignout = () =>{
    signOut(auth).then((res)=>{
        window.location.href = '/login'
        localStorage.removeItem("user");
})
    .catch((err)=>{
        console.log(err)
    })
}
    render() {
        return (
            <div className='header'>
                <div className="logo">
                <Link to="/">
                    <img src="./images/insta_logo.avif" alt="insta-logo" />
                </Link>
                </div>
                <div className="user_profile">
                <Link to="/profile">
                    <img src={this.state.userprofile.profileUrl} alt="profile_img" />
                </Link>
                   <Button className="logout" variant="outlined" color='error' onClick={this.handleSignout}>Logout</Button>
                </div>
            </div>
        )
    }
}
