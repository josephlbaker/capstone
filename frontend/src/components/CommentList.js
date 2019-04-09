import React, { Component } from 'react'

export default class CommentList extends Component {

  state = {
    comments: []
  }

  componentDidMount() {
    fetch(`http://localhost:3001/comments`, {
      method: 'GET'
    })
      .then(results => results.json())
      .then(data => this.setState({ comments: data }))
      .catch(function (error) { console.log(error) });
  }

  _renderComments = (comment, index) => {
    if (comment.post === this.props.post) {
      return <li key={index}>{comment.content}</li>
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

// {comment.user.username}
