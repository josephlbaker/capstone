import React, { Component } from 'react'
import axios from 'axios';

export default class CommentList extends Component {

  state = {
    comments: []
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

  _renderComments = (comment, index) => {
    if (comment.post._id === this.props.post._id && this.props.user._id === comment.user) {
      return (<li key={index}>{comment.content} - {comment.user} <button onClick={() => { this.handleDeleteComment(comment._id) }}>Delete Comment</button></li>)
    }
    if (comment.post._id === this.props.post._id) {
      return (<li key={index}>{comment.content} - {comment.user}</li>)
    }
    else {
      return null;
    }
  }

  render() {
    const { comments } = this.state;

    return (
      <div>
        <h2>Comments</h2>
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
