import React, { Component } from 'react'
import axios from 'axios';
import '../styles/Profile.css';
import { Button, Container, Menu, Segment } from 'semantic-ui-react'


import EditProfile from './EditProfile';

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
      <div className="profile-container">
        <Menu inverted color="blue" className="top-nav">
          <Menu.Item><h3>My Profile</h3></Menu.Item>
        </Menu>
        <Container>
          <Segment>
            <img src="https://thesocietypages.org/socimages/files/2009/05/vimeo.jpg" alt="" />
            <p>{this.props.user.firstName}</p>
            <br />
            <p>{this.props.user.lastName}</p>
            <br />
            <p>{this.props.user.username}</p>
            <br />
            <p>{this.props.user.email}</p >
            <br />
            <br />
            <Button primary onClick={this.handleClick.bind(this, 'edit-profile')}>Edit Profile</Button>
            <Button onClick={this.handleLogOut}>Log Out</Button>
            {this.renderSubComp()}
          </Segment>
        </Container>
      </div>
    )
  }
}
