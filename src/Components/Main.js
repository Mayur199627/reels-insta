import React, { Component } from 'react'
import Posts from './Posts'
import VideoUpload from './VideoUpload'
// import Header from './Header'

export default class Main extends Component {
  render() {
    return (
      <div>
      <VideoUpload />
      <Posts />
      </div>
    )
  }
}
