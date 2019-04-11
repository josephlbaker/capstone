import React, { Component } from 'react'
import axios from 'axios'

export default class EditPost extends Component {

  state = {
    title: this.props.post.title,
    content: this.props.post.content,
    platform: this.props.post.platform,
    gameId: this.props.post.gameId,
    gameTitle: this.props.post.gameTitle,
    isEvent: this.props.post.isEvent,
    players: this.props.post.players
  }

  handleCheckbox = event => {
    if (this.state.isEvent === false || this.state.isEvent === 'off') {
      this.setState({
        isEvent: true
      })
    }
    if (this.state.isEvent === true || this.state.isEvent === 'on') {
      this.setState({
        isEvent: false
      })
    }
  }

  handleInput = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleEditPost = event => {
    event.preventDefault();
    axios
      .put(`http://localhost:3001/posts/${this.props.post._id}/updatepost`, {
        title: this.state.title,
        content: this.state.content,
        platform: this.state.platform,
        gameId: this.state.gameId,
        gameTitle: this.state.gameTitle,
        isEvent: this.state.isEvent,
        players: this.state.players
      })
      .then(res => {
        console.log(res);
        this.props.handleGoBack();
      })
      .catch(err => {
        console.log("Error");
      })
  };

  handleDeletePost = event => {
    axios
      .delete(`http://localhost:3001/posts/${this.props.post._id}/deletepost`)
      .then(res => {
        console.log(res);
        this.props.handleGoBack();
      })
      .catch(err => {
        console.log("Error");
      })
  }

  render() {
    return (
      <div className="new-post">
        <button onClick={this.props.handleBackToPosts}>Go back</button>
        <h2>Edit your Post</h2>
        <form>
          <p>Title</p>
          <input name="title" placeholder={this.state.title} onChange={this.handleInput} />
          <p>Content</p>
          <input name="content" placeholder={this.state.content} onChange={this.handleInput} />
          <p>Platform</p>
          <input name="platform" placeholder={this.state.platform} onChange={this.handleInput} />
          <label htmlFor="isEvent">Is this an event?</label>
          <input type="checkbox" name="isEvent" onChange={this.handleCheckbox} />
          <p>Other players will be able to join</p>
          <button name="submit" onClick={this.handleEditPost}>Submit</button>
        </form>
        <button name="delete" onClick={this.handleDeletePost}>Delete Post</button>
      </div>
    )
  }
}
