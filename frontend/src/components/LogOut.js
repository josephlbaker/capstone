import React, { Component } from 'react'

export default class LogOut extends Component {
  render() {
    return (
      <div>
        <button name="login" onClick={this.props.handleLogOut}>Log Out</button>
      </div>
    )
  }
}
