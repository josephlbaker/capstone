import React, { Component } from 'react'
import axios from 'axios';

import EditPost from './EditPost';
import CommentList from './CommentList';

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

  handleJoin = (event) => {
    event.preventDefault();
    if (!this.state.post.players.includes(this.props.user.username)) {
      let user = this.props.user.username
      this.state.post.players.push(user)
      axios
        .put(`http://localhost:3001/posts/${this.state.post._id}/updatepost`, {
          players: this.state.post.players
        })
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log("Error");
        })
    }
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
          <CommentList post={this.state.post} />
        </div>
      )
    }
    if (this.state.post.isEvent) {
      return (
        <div>
          {this.state.post.title}
          {this.state.post.gameTitle}
          {this.state.post.content}
          {this.state.post.platform}
          {this.state.post.players}
          <button name="joinEvent" onClick={this.handleJoin}>Join Event</button>
          <CommentList post={this.state.post} />
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
        <CommentList post={this.state.post} />
      </div>
    )
  }
}
