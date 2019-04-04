import React, { Component } from 'react'

export default class Post extends Component {
  render() {
    return (
      <div>

        <div className="myPosts">
        </div>

        <form>
          <input name="title" placeholder="Title" onChange={this.props.handleInput} />
          <input name="content" placeholder="Content" onChange={this.props.handleInput} />
          <input name="timestamp" placeholder="Current Time" onChange={this.props.handleInput} />
          <input name="gameTitle" placeholder="Game" onChange={this.props.handleInput} />
          <input name="platform" placeholder="platform" onChange={this.props.handleInput} />
          <button name="submit" onClick={this.props.handleNewPost}>Submit</button>
        </form>
      </div>
    )
  }
}
