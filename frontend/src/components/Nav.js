import React, { Component } from 'react'
import LogOut from './LogOut';

export default class Nav extends Component {
  render() {
    if (this.props.isLoggedIn) {
      return (
        <div>
          <a href="/">Games</a>
          <a href="/posts">Posts</a>
          <LogOut
            isLoggedIn={this.props.isLoggedIn}
            handleLogOut={this.props.handleLogOut} />
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
