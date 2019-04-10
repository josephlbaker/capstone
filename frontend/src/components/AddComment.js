import React, { Component } from 'react'
import axios from 'axios';

export default class AddComment extends Component {

  handleNewComment = event => {
    event.preventDefault();
    axios
      .post("http://localhost:3001/comments/createcomment", {
        content: this.state.content,
        user: this.props.user,
        post: this.props.post
      })
      .then(res => {
        console.log(res);
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

  render() {
    return (
      <div className="new-post">
        <h2>Add a Post</h2>
        <form>
          <input name="content" placeholder="Content" onChange={this.handleInput} />
          <button name="submit" onClick={this.handleNewComment}>Submit</button>
        </form>
      </div>
    )
  }
}
