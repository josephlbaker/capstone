import React, { Component } from 'react'
import ViewPost from './ViewPost';
import { debounce } from 'throttle-debounce'

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

  handleNewPostSubmit = () => {
    this.setState({
      newPost: false,
      postId: ''
    })
  }

  _renderPosts = (post, index) => {
    if (post.user.username === this.props.user.username) {
      return <li key={index}>{post.title} - {post.content} - {post.user.username}
        <button name="viewPost" onClick={() => { this.handleClick(post) }}>View</button>
      </li>
    } else {
      return null;
    }
  }

  render() {
    const { posts } = this.state;

    if (this.state.postId) {
      return (
        <ViewPost
          user={this.props.user}
          postId={this.state.postId}
          handleNewPostSubmit={this.handleNewPostSubmit}
        />
      )
    } else {
      return (
        <div>
          <h1>Posts</h1>
          <ul>
            {
              posts ?
                posts.map(this._renderPosts)
                :
                "No posts for this game"
            }
          </ul>
        </div>
      );
    }
  }
}
