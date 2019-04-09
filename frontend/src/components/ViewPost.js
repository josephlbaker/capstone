import React, { Component } from 'react'
import EditPost from './EditPost';

export default class ViewPost extends Component {

  state = {
    post: {},
    edit: ''
  }

  componentDidMount() {
    fetch(`http://localhost:3001/posts/${this.props.postId}`, {
      method: 'GET'
    })
      .then(results => results.json())
      .then(data => this.setState({ post: data }))
  }

  handleClick = () => {
    this.setState({
      edit: true
    })
  }

  render() {
    if (this.state.edit === true) {
      return (
        <EditPost post={this.state.post} />
      )
    }
    if (this.props.user._id === this.state.post.user) {
      return (
        <div>
          {this.state.post.title}
          {this.state.post.gameTitle}
          {this.state.post.content}
          {this.state.post.platform}
          {this.state.post.players}
          <button name="editPost" onClick={this.handleClick}>Edit</button>
        </div>
      )
    }
    return (
      <div>
        {this.state.post.title}
        {this.state.post.gameTitle}
        {this.state.post.content}
        {this.state.post.platform}
        {this.state.post.players}
      </div>
    )
  }
}
