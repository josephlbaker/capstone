import React, { Component } from 'react'

export default class LogOut extends Component {

  handleLogOut = () => {
    this.setState({
      email: "",
      password: "",
      isLoggedIn: false
    });
    localStorage.clear();
    window.location.href = "/"
  };

  render() {
    return (
      <div>
        <button name="login" onClick={this.handleLogOut}>Log Out</button>
      </div>
    )
  }
}
