import React, { Component } from 'react'
import EditPost from './EditPost';

export default class MyPosts extends Component {

  // content = { this.props.post.content }
  // platform = { this.props.post.platform }

  handleEdit = () => {
    return (
      <EditPost post={this.props.post} />
    )
  }


  render() {
    return (
      <div>
        {this.props.post.title}
        <button name="editPost" onClick={this.handleEdit}>Edit</button>
      </div>
    )
  }
}
