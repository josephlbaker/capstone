import React, { Component } from 'react'
import axios from 'axios';
import { debounce } from 'throttle-debounce';

import AddComment from './AddComment';

export default class CommentList extends Component {

  state = {
    comments: [],
    newComment: false
  }

  componentDidMount() {
    fetch(`http://localhost:3001/comments`, {
      method: 'GET'
    })
      .then(results => results.json())
      .then(data => {
        this.setState({ comments: data })
      })
      .catch(function (error) { console.log(error) });
  }

  componentDidUpdate() {
    debounce(500, () => {
      fetch(`http://localhost:3001/comments`, {
        method: 'GET'
      })
        .then(results => results.json())
        .then(data => {
          this.setState({ comments: data })
        })
        .catch(function (error) { console.log(error) });
    });
  }

  handleDeleteComment(comment) {
    axios
      .delete(`http://localhost:3001/comments/${comment}/deletecomment`)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log("Error");
      })
  }

  handleNewCommentClick = () => {
    this.setState({
      newComment: true
    })
  }

  handleNewCommentSubmit = () => {
    this.setState({
      newComment: false
    })
  }

  _renderComments = (comment, index) => {
    if (comment.post._id === this.props.post._id && this.props.user._id === comment.user._id) {
      return (<li key={index}>{comment.content} - {comment.user.username} <button onClick={() => { this.handleDeleteComment(comment._id) }}>Delete Comment</button></li>)
    }
    if (comment.post._id === this.props.post._id) {
      return (<li key={index}>{comment.content} - {comment.user.username}</li>)
    }
    else {
      return null;
    }
  }

  render() {
    const { comments } = this.state;
    if (this.state.newComment) {
      return (
        <AddComment
          handleNewCommentSubmit={this.handleNewCommentSubmit}
          post={this.props.post}
          user={this.props.user} />
      );
    }
    if (!this.state.newComment) {
      return (
        <div>
          <h2>Comments</h2>
          <button onClick={this.handleNewCommentClick}>Add a comment</button>
          <ul>
            {
              comments ?
                comments.map(this._renderComments)
                :
                "No comments yet..."
            }
          </ul>
        </div>
      );
    }
  }
}
