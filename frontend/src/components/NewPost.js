import React, { Component } from 'react'
import axios from 'axios';
import GamePosts from './GamePosts';

export default class NewPost extends Component {
  state = {
    isEvent: false
  }

  render() {
    return (
      <div>
        <div className="new-post">
          <h2>Add a Post</h2>
          <button name="cancel" onClick={this.props.handleCancel}>Cancel</button>
          <form onSubmit={this.props.handleNewPost}>
            <input name="title" placeholder="Title" onChange={this.props.handleInput} />
            <input name="content" placeholder="Content" onChange={this.props.handleInput} />
            {/* <input name="timestamp" placeholder="Current Time" onChange={this.props.handleInput} /> */}
            {/* <input name="gameTitle" placeholder="Game" onChange={this.props.handleInput} /> */}
            <input name="platform" placeholder="platform" onChange={this.props.handleInput} />
            <label htmlFor="isEvent">Is this an event?</label>
            <input type="checkbox" name="isEvent" onChange={this.props.handleCheckbox} />
            <p>Other players will be able to join</p>
            <input type="submit" value="Submit" name="submit" />
          </form>
        </div>
      </div>
    )
  }
}
