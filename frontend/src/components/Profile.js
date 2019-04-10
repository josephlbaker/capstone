import React, { Component } from 'react'
import EditProfile from './EditProfile';

export default class Profile extends Component {

  state = {
    render: ''
  }

  handleClick(compName, e) {
    this.setState({ render: compName });
  }

  renderSubComp() {
    switch (this.state.render) {
      case 'edit-profile':
        return <EditProfile
          user={this.props.user}
        />
      // default: return null
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
        </ul>
        {this.renderSubComp()}
      </div>
    )
  }
}
