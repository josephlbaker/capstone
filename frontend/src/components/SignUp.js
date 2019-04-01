import React, { Component } from 'react'

export default class SignUp extends Component {
  render() {
    return (
      <div>
        <form>
          <input name="firstName" placeholder="First Name" onChange={this.props.handleInput} />
          <input name="lastName" placeholder="Last Name" onChange={this.props.handleInput} />
          <input name="email" placeholder="Email" onChange={this.props.handleInput} />
          <input name="username" placeholder="Username" onChange={this.props.handleInput} />
          <input name="password" placeholder="Password" onChange={this.props.handleInput} />
          <input name="preference1" placeholder="Preference" onChange={this.props.handleInput} />
          <input name="preference2" placeholder="Preference" onChange={this.props.handleInput} />
          <button name="submit" onClick={this.props.handleSignUp}>Submit</button>
        </form>
      </div>
    )
  }
}
