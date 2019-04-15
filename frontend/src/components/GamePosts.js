import React, { Component } from 'react'
import axios from 'axios';
import { debounce } from 'throttle-debounce'
import { Container, Segment, Icon, Menu } from 'semantic-ui-react'

import '../styles/GamePosts.css';

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

  fetchPosts = () => {
    fetch("http://localhost:3001/posts", {
      method: "GET"
    })
      .then(results => results.json())
      .then(data => this.setState({ posts: data }))
      .catch(function (error) { console.log(error) });
  }

  componentDidMount() {
    this.fetchPosts();
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
      username: result.user.username
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
    this.fetchPosts();
  }

  _renderPosts = (post, index) => {
    if (post.gameId === this.props.gameId.toString()) {
      return (
        <Segment raised key={index}>
          <h3>{post.title}</h3> <p className="username">-{post.user.username}</p>
          <br />
          <p>{post.content}</p>
          <div>
            <br />
            <button className="edit-post" name="editPost" onClick={() => { this.handleClick(post) }}>View Details</button>
          </div>
        </Segment>
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
          username={this.state.username}
          handleGoBack={this.handleGoBack}
          user={this.props.user}
          postId={this.state.postId}
          handleNewPostSubmit={this.handleNewPostSubmit}
        />
      )
    }
    if (!this.state.newPost) {
      return (
        <div className="game-post-body">
          <Menu inverted color="blue" className="top-nav">
            <Menu.Item className="back"><button className="back" onClick={this.props.handleGoBack}><Icon inverted name='arrow left' size='large' /></button></Menu.Item>
            <Menu.Item className="new-post" position='right'><button className="new-post" onClick={this.handleNewPostClick}><Icon inverted name='edit' size='large' /></button></Menu.Item>
          </Menu>
          <h1>Posts for {this.props.gameTitle}</h1>
          <Container>
            {
              posts ?
                posts.map(this._renderPosts)
                :
                "No posts for this game"
            }
          </Container>
        </div>
      )
    }
  }
}
