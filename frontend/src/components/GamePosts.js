import React, { Component } from 'react'
import axios from 'axios';

import ViewPost from './ViewPost';
import NewPost from './NewPost';
import PopularGames from './PopularGames';

export default class GamePosts extends Component {

  state = {
    posts: [],
    postId: '',
    newPost: false
  }

  componentDidMount() {
    fetch("http://localhost:3001/posts", {
      method: "GET"
    })
      .then(results => results.json())
      .then(data => this.setState({ posts: data }))
      .catch(function (error) { console.log(error) });
  }

  componentDidUpdate() {
    fetch("http://localhost:3001/posts", {
      method: "GET"
    })
      .then(results => results.json())
      .then(data => this.setState({ posts: data }))
      .catch(function (error) { console.log(error) });
  }

  handleClick(result) {
    this.setState({
      postId: result._id,
    })
  }

  handleNewPostClick = () => {
    this.setState({
      newPost: true
    })
  }

  handleNewPostSubmit = () => {
    this.setState({
      newPost: false,
      postId: ''
    })
  }

  _renderPosts = (post, index) => {
    if (post.gameId === this.props.gameId.toString()) {
      return (
        <li key={index}>
          {post.title} - {post.content} - {post.user.username}
          <div>
            <button name="editPost" onClick={() => { this.handleClick(post) }}>View</button>
          </div>
        </li>
      )
    } else {
      return null;
    }
  }

  render() {
    const { posts } = this.state;

    if (this.state.newPost) {
      return (
        <NewPost user={this.props.user}
          gameTitle={this.props.gameTitle}
          gameId={this.props.gameId}
          handleNewPostSubmit={this.handleNewPostSubmit} />
      )
    }
    if (this.state.postId) {
      return (
        <ViewPost
          user={this.props.user}
          postId={this.state.postId}
          handleNewPostSubmit={this.handleNewPostSubmit}
        />
      )
    }
    if (!this.state.newPost) {
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
            <li><button onClick={this.handleNewPostClick}>New Post</button></li>
          </ul>
        </div>
      )
    }
  }
}
