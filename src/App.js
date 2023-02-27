import React, { Component } from 'react'
import Login from './Components/Login'
import Signup from './Components/Signup'
import Main from './Components/Main'
import Profile from './Components/Profile';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './Components/Header';
import PrivateRoute from './Components/PrivateRoute';
import Footer from './Components/Footer';

export default class App extends Component {
  render() {
    return (
      <div>
      <BrowserRouter>
        <Routes >
          <Route path='/login' element={<Login />} ></Route>
          <Route path='/signup' element={<Signup />} ></Route>
          <Route path= '/' element={<PrivateRoute><Header></Header><Main /><Footer></Footer></PrivateRoute>}></Route>
          <Route path= '/profile' element={<PrivateRoute><Header></Header><Profile /><Footer></Footer></PrivateRoute>}></Route>
        </Routes>
      </BrowserRouter>      
      </div>
    )
  }
}
