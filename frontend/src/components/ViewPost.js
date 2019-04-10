import React, { Component } from 'react'
import axios from 'axios';

import EditPost from './EditPost';
import CommentList from './CommentList';
import AddComment from './AddComment';

export default class ViewPost extends Component {

  state = {
    post: {},
    edit: '',
    gamePosts: false,
    myPosts: false
  }

  componentDidMount() {
    fetch(`http://localhost:3001/posts/${this.props.postId}`, {
      method: 'GET'
    })
      .then(results => results.json())
      .then(data => this.setState({ post: data }))
  }

  returnToGamePosts = () => {
    if (this.props.postId) {
      this.setState({
        gamePosts: true
      })
    } else {
      this.setState({
        myPosts: true
      })
    }
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
    // if (this.state.gamePosts) {
    //   return (
    //     <GamePosts />
    //   )
    // }
    // if (this.state.myPosts) {
    //   return (
    //     <Post />
    //   )
    // }
    if (this.state.edit === true) {
      return (
        <EditPost post={this.state.post} />
      )
    }
    if (this.props.user._id === this.state.post.user) {
      return (
        <div>
          <button onClick={this.returnToGamePosts}>Go back</button>
          {this.state.post.title}
          {this.state.post.gameTitle}
          {this.state.post.content}
          {this.state.post.platform}
          {this.state.post.players}
          <button name="editPost" onClick={this.handleClick}>Edit</button>
          <CommentList user={this.props.user}
            post={this.state.post} />
          <AddComment
            post={this.state.post}
            user={this.props.user} />
        </div>
      )
    }
    if (this.state.post.isEvent) {
      return (
        <div>
          <button onClick={this.returnToGamePosts}>Go back</button>
          {this.state.post.title}
          {this.state.post.gameTitle}
          {this.state.post.content}
          {this.state.post.platform}
          <h1>Players participating</h1>
          {this.state.post.players}
          <button name="joinEvent" onClick={this.handleJoin}>Join Event</button>
          <CommentList user={this.props.user}
            post={this.state.post} />
          <AddComment
            post={this.state.post}
            user={this.props.user} />
        </div>
      )
    }
    return (
      <div>
        <button onClick={this.returnToGamePosts}>Go back</button>
        {this.state.post.title}
        {this.state.post.gameTitle}
        {this.state.post.content}
        {this.state.post.platform}
        {this.state.post.players}
        <CommentList user={this.props.user}
          post={this.state.post} />
        <AddComment
          post={this.state.post}
          user={this.props.user} />
      </div>
    )
  }
}