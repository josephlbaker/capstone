import React, { Component } from 'react'

import SignUp from './SignUp';
import LogIn from './LogIn';

export default class Nav extends Component {
  render() {
    return (
      <div>
        <SignUp handleSignUp={this.props.handleSignUp} handleInput={this.props.handleInput} />
        <LogIn handleLogin={this.props.handleLogin} handleInput={this.props.handleInput} />
      </div>
    )
  }
}
