import React, { Component } from 'react'
import axios from 'axios';

export default class AddComment extends Component {

  render() {
    return (
      <div className="new-post">
        <h2>Add a Comment</h2>
        <button onClick={this.props.cancelComment}>Cancel</button>
        <form onSubmit={this.props.handleNewComment}>
          <input name="content" placeholder="Content" onChange={this.props.handleInput} />
          <input type="submit" value="Submit" name="submit" />
        </form>
      </div>
    )
  }
}
