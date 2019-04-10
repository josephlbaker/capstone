import React, { Component } from 'react'
import axios from 'axios';
import GamePosts from './GamePosts';

export default class NewPost extends Component {
  state = {
    isEvent: false
  }

  handleNewPost = event => {
    event.preventDefault();
    axios
      .post("http://localhost:3001/posts/createpost", {
        title: this.state.title,
        content: this.state.content,
        user: this.props.user,
        // user: this.state.userId,
        // timestamp: this.state.timestamp,
        // gameTitle: this.state.gameTitle,
        platform: this.state.platform,
        gameId: this.props.gameId,
        gameTitle: this.props.gameTitle,
        isEvent: this.state.isEvent
      })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log("Error");
      })
    this.props.handleNewPostSubmit();
  };

  handleCancel = event => {
    event.preventDefault();
    this.props.handleNewPostSubmit();
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

  render() {
    return (
      <div>
        <div className="new-post">
          <h2>Add a Post</h2>
          <button name="cancel" onClick={this.handleCancel}>Cancel</button>
          <form>
            <input name="title" placeholder="Title" onChange={this.handleInput} />
            <input name="content" placeholder="Content" onChange={this.handleInput} />
            {/* <input name="timestamp" placeholder="Current Time" onChange={this.props.handleInput} /> */}
            {/* <input name="gameTitle" placeholder="Game" onChange={this.props.handleInput} /> */}
            <input name="platform" placeholder="platform" onChange={this.handleInput} />
            <label htmlFor="isEvent">Is this an event?</label>
            <input type="checkbox" name="isEvent" onChange={this.handleCheckbox} />
            <p>Other players will be able to join</p>
            <button name="submit" onClick={this.handleNewPost}>Submit</button>
          </form>
        </div>
      </div>
    )
  }
}
