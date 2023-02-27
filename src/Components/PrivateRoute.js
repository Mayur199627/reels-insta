import  { Component } from 'react';
// import {Redirect} from 'react-router';
// import { Route } from 'react-router-dom';

export default class PrivateRoute extends Component {
  constructor(){
    super();
    const loggedInUser = JSON.parse(localStorage.getItem("user")) || {};
    this.state = {
        loggedInUser:loggedInUser,
    }
  }
    render() {
        if(Object.keys(this.state.loggedInUser).length  === 0){
            window.location.href = '/login'
        }
    return this.props.children;      
  }
}
