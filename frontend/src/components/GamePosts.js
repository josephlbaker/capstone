import React, { Component } from 'react'
import axios from 'axios';

export default class GamePosts extends Component {

  state = {
    title: "",
    content: "",
    platform: "",
    posts: [],
    isEvent: false,
    players: []
  }

  componentDidMount() {
    fetch("http://localhost:3001/posts", {
      method: "GET"
    })
      .then(results => results.json())
      .then(data => this.setState({ posts: data }))
      .catch(function (error) { console.log(error) });
  }

  _renderPosts = (post, index) => {
    if (post.gameId === this.props.gameId.toString() && post.isEvent) {
      return (
        <li key={index}>
          {post.title} - {post.content} - {post.user.username}

          <div>
            <button onClick={this.handleJoin}>Join Game</button>
          </div>
        </li>
      )
    }
    else if (post.gameId === this.props.gameId.toString()) {
      return (
        <li key={index}>
          {post.title} - {post.content} - {post.user.username}
        </li>
      )
    } else {
      return null;
    }
  }

  // handleJoin = () => {

  // }

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
        isEvent: this.state.isEvent
      })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log("Error");
      })
  };

  render() {
    const { posts } = this.state;


    return (
      <div>
        <h1>Posts for {this.props.gameTitle}</h1>
        <ul>
          {
            posts ?
              posts.map(this._renderPosts)
              :
              "No posts for this game"
          }
        </ul>

        <div className="new-post">
          <h2>Add a Post</h2>
          <form>
            <input name="title" placeholder="Title" onChange={this.handleInput} />
            <input name="content" placeholder="Content" onChange={this.handleInput} />
            {/* <input name="timestamp" placeholder="Current Time" onChange={this.props.handleInput} /> */}
            {/* <input name="gameTitle" placeholder="Game" onChange={this.props.handleInput} /> */}

            <label htmlFor="isEvent">Is this an event?</label>
            <input type="checkbox" name="isEvent" onChange={this.handleCheckbox} />
            <p>Other players will be able to join</p>

            <input name="platform" placeholder="platform" onChange={this.handleInput} />
            <button name="submit" onClick={this.handleNewPost}>Submit</button>
          </form>
        </div>
      </div>
    )
  }
}
