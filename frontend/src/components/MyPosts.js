import React, { Component } from 'react'

export default class MyPosts extends Component {
  render() {
    return (
      <div>
        {this.props.post.title}
      </div>
    )
  }
}
