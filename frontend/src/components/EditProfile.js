import React, { Component } from 'react'
import axios from 'axios';

export default class EditProfile extends Component {

  state = {
    firstName: this.props.user.firstName,
    lastName: this.props.user.lastName,
    email: this.props.user.email,
    username: this.props.user.username,
    password: this.props.user.password,
  }

  handleInput = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleEditProfile = event => {
    event.preventDefault();
    axios
      .put(`http://localhost:3001/users/${this.props.user._id}/update`, {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        username: this.state.username,
        password: this.state.password,
      })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log("Error");
      })
  };

  render() {
    return (
      <div>
        <form>
          <input name="firstName" placeholder={this.state.firstName} onChange={this.handleInput} />
          <input name="lastName" placeholder={this.state.lastName} onChange={this.handleInput} />
          <input name="email" placeholder={this.state.email} onChange={this.handleInput} />
          <input name="username" placeholder={this.state.username} onChange={this.handleInput} />
          <input name="password" placeholder="New Password" onChange={this.handleInput} />
          <button name="editProfile" onClick={this.handleEditProfile}>Submit</button>
        </form>
      </div>
    )
  }
}
