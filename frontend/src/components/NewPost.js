import React, { Component } from 'react'
import axios from 'axios';
import GamePosts from './GamePosts';
import { Container, Segment, Button, Menu, Icon } from 'semantic-ui-react'
import '../styles/NewPost.css';



export default class NewPost extends Component {
  state = {
    isEvent: false
  }

  render() {
    return (
      <div className="add-post">
        <Menu inverted color="blue" className="top-nav">
          <Menu.Item className="back"><button onClick={this.props.handleCancel}><Icon inverted name='arrow left' size='large' /></button></Menu.Item>
        </Menu>
        <Container>
          <Segment className="form-segment">
            <h2>Add a Post</h2>
            <form onSubmit={this.props.handleNewPost}>
              <input className="text" name="title" placeholder="Title" onChange={this.props.handleInput} />
              <input className="text" name="content" placeholder="Content" onChange={this.props.handleInput} />
              <input className="text" name="platform" placeholder="platform" onChange={this.props.handleInput} />
              <label htmlFor="isEvent">Is this an event? Other players will be able to join.</label>
              <input className="checkbox" type="checkbox" value="yes" name="isEvent" onChange={this.props.handleCheckbox} />
              <input className="submit-button" type="submit" value="Submit" name="submit" />
            </form>
          </Segment>
        </Container>
      </div>

    )
  }
}
