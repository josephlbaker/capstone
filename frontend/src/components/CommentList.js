import React, { Component } from 'react'
import axios from 'axios';
import { debounce } from 'throttle-debounce';

import AddComment from './AddComment';

export default class CommentList extends Component {

  state = {
    comments: [],
    newComment: false,
    content: ''
  }

  componentDidMount() {
    this.fetchComments();
  }

  fetchComments = () => {
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
        this.fetchComments();
      })
      .catch(err => {
        console.log("Error");
      })
  }

  handleNewComment = event => {
    event.preventDefault();
    axios
      .post("http://localhost:3001/comments/createcomment", {
        content: this.state.content,
        user: this.props.user,
        post: this.props.post
      })
      .then(res => {
        let myNewComment = res.data;
        this.state.comments.push(myNewComment)
        console.log(res);
        this.setState({
          comments: this.state.comments,
          newComment: false
        })
        this.fetchComments();
      })
      .catch(err => {
        console.log("Error");
      })
  };

  handleInput = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleNewCommentClick = () => {
    this.setState({
      newComment: true
    })
  }

  cancelComment = () => {
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
          handleInput={this.handleInput}
          handleNewComment={this.handleNewComment}
          cancelComment={this.cancelComment}
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
