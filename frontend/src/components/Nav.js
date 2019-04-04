import React, { Component } from 'react'

export default class Nav extends Component {
  render() {
    if (this.props.isLoggedIn) {
      return (
        <div>
          <a href="/posts">Posts</a>
        </div>
      )
    } else {
      return (
        <div>
          <a href="/login">Login</a>
          <a href="/signup">Signup</a>
        </div>
      )
    }
  }
}
