import React, { Component } from 'react'
import axios from 'axios';
import { debounce } from 'throttle-debounce'


import ViewPost from './ViewPost';
import NewPost from './NewPost';
import PopularGames from './PopularGames';

export default class GamePosts extends Component {

  state = {
    posts: [],
    postId: '',
    newPost: false,
    isEvent: false
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
    debounce(500, () => {
      fetch("http://localhost:3001/posts", {
        method: "GET"
      })
        .then(results => results.json())
        .then(data => this.setState({ posts: data }))
        .catch(function (error) { console.log(error) });
    });
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


  handleCancel = (e) => {
    e.preventDefault();
    this.setState({
      newPost: false
    })
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
        let myNewPost = res.data;
        this.state.posts.push(myNewPost)

        this.setState({
          posts: this.state.posts,
          newPost: false,
          postId: ''
        })
      })
      .catch(err => {
        console.log("Error", err);
      })
  };

  handleGoBack = () => {
    this.setState({
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
          handleNewPost={this.handleNewPost}
          handleInput={this.handleInput}
          handleCancel={this.handleCancel}
        />
      )
    }
    if (this.state.postId) {
      return (
        <ViewPost
          handleGoBack={this.handleGoBack}
          user={this.props.user}
          postId={this.state.postId}
          handleNewPostSubmit={this.handleNewPostSubmit}
        />
      )
    }
    if (!this.state.newPost) {
      return (
        <div>
          <button onClick={this.props.handleGoBack}>Go back</button>
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
