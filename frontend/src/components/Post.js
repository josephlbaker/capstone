import React, { Component } from 'react'
import ViewPost from './ViewPost';
import { debounce } from 'throttle-debounce'
import { Segment, Container, Menu } from 'semantic-ui-react'

import '../styles/Post.css';


export default class Post extends Component {

  state = {
    posts: [],
    postId: '',
    newPost: false
  }

  handleClick(result) {
    this.setState({
      postId: result._id,
    })
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

  handleNewPostSubmit = () => {
    this.setState({
      newPost: false,
      postId: ''
    })
  }

  handleGoBack = () => {
    this.setState({
      postId: ''
    })
    this.fetchPosts();
  }

  _renderPosts = (post, index) => {
    if (post.user.username === this.props.user.username) {
      return (
        <Segment raised key={index}>
          <h3>{post.title}</h3> <p className="username">-{post.user.username}</p>
          <br />
          <p className="game-title">{post.gameTitle}</p>
          <br />
          <p className="content">{post.content}</p>
          <br />
          <button className="edit-post" name="viewPost" onClick={() => { this.handleClick(post) }}>View Details</button>
        </Segment>
      )
    } else {
      return null;
    }
  }

  render() {
    const { posts } = this.state;

    if (this.state.postId) {
      return (
        <ViewPost
          handleGoBack={this.handleGoBack}
          user={this.props.user}
          postId={this.state.postId}
          handleNewPostSubmit={this.handleNewPostSubmit}
        />
      )
    } else {
      return (
        <div className="parent">
          <Menu inverted color="blue" className="top-nav">
            <Menu.Item><h3>My Feed</h3></Menu.Item>
          </Menu>
          <Container>
            {
              posts ?
                posts.map(this._renderPosts)
                :
                "No posts yet..."
            }
          </Container>
        </div>
      );
    }
  }
}
