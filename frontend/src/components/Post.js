import React, { Component } from 'react'
import axios from 'axios';
import ViewPost from './ViewPost';

export default class Post extends Component {

  state = {
    posts: [],
    postId: ''
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

  _renderPosts = (post, index) => {
    if (post.user.username === this.props.user.username) {
      return <li key={index}>{post.title} - {post.content} - {post.user.username}
        <button name="editPost" onClick={() => { this.handleClick(post) }}>View</button>
      </li>
    } else {
      return null;
    }
  }

  render() {
    const { posts } = this.state;

    if (this.state.postId) {
      return (
        <ViewPost postId={this.state.postId} />
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
