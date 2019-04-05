import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export default class LogIn extends Component {
  // state = {
  //   redirect: false
  // }
  // setRedirect = () => {
  //   this.setState({
  //     redirect: true
  //   })
  // }
  // renderRedirect = () => {
  //   if (this.state.redirect) {
  //     return <Redirect to='/' />
  //   }
  // }

  render() {
    return (
      <div>
        <form>
          <input name="email" placeholder="Email" onChange={this.props.handleInput} />
          <input name="password" placeholder="Password" onChange={this.props.handleInput} />
          {/* <Link to="/" name="login" onClick={this.props.handleLogin}>Click to login</Link> */}
          {/* {this.renderRedirect()} */}
          <button name="login" onClick={this.props.handleLogin}>Submit</button>
        </form>
      </div >
    )
  }
}
