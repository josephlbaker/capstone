import React, { Component } from 'react'
import axios from 'axios';

import EditProfile from './EditProfile';
import LogOut from './LogOut';

export default class Profile extends Component {

  state = {
    render: '',
    edit: false
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

  handleClick(compName, e) {
    this.setState({ render: compName });
  }

  renderSubComp() {
    switch (this.state.render) {
      case 'edit-profile':
        return <EditProfile
          handleInput={this.handleInput}
          handleEditProfile={this.handleEditProfile}
          user={this.props.user}
        />
    }
  }

  render() {
    return (
      <div>
        <h1>Your profile</h1>
        {this.props.user.firstName}
        {this.props.user.lastName}
        {this.props.user.username}
        {this.props.user.email}
        <ul>
          <li onClick={this.handleClick.bind(this, 'edit-profile')}>Edit Profile</li>
          <li><LogOut handleLogOut={this.props.handleLogOut} /></li>
        </ul>
        {this.renderSubComp()}
      </div>
    )
  }
}
