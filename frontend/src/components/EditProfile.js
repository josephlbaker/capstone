import React, { Component } from 'react'
import axios from 'axios';

export default class EditProfile extends Component {

  state = {
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: ''
  }

  handleInput = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  // handleEditProfile = event => {
  //   event.preventDefault();
  //   axios
  //     .put()
  // }

  // handleSignUp = event => {
  //   event.preventDefault();
  //   axios
  //     .post("http://localhost:3001/users/signup", {
  //       firstName: this.state.firstName,
  //       lastName: this.state.lastName,
  //       email: this.state.email,
  //       redirect: true,
  //       username: this.state.username,
  //       password: this.state.password
  //     })
  //     .then(response => {
  //       localStorage.token = response.data.signedJwt;

  //       this.setState({
  //         isLoggedIn: true,
  //         user: response.data.user
  //       });
  //     })
  //     .catch(err => console.log(err));
  // };

  render() {
    return (
      <div>
        <form>
          <input name="firstName" placeholder={this.props.user.firstName} onChange={this.props.handleInput} />
          <input name="lastName" placeholder={this.props.user.lastName} onChange={this.props.handleInput} />
          <input name="email" placeholder={this.props.user.email} onChange={this.props.handleInput} />
          <input name="username" placeholder={this.props.user.username} onChange={this.props.handleInput} />
          <input name="password" placeholder="Password" onChange={this.props.handleInput} />
          <input name="confirmPassword" placeholder="Password" onChange={this.props.handleInput} />
          <button name="login" onClick={this.props.handleEditProfile}>Submit</button>
        </form>
      </div>
    )
  }
}
