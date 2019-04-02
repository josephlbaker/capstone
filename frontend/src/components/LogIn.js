import React, { Component } from 'react'

export default class LogIn extends Component {
  render() {
    return (
      <div>
        <form>
          <input name="email" placeholder="Email" onChange={this.props.handleInput} />
          <input name="password" placeholder="Password" onChange={this.props.handleInput} />
          <button name="login" onClick={this.props.handleLogin}>Submit</button>
        </form>
      </div>
    )
  }
}
