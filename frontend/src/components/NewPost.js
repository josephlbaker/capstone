import React, { Component } from 'react'
import axios from 'axios';
import GamePosts from './GamePosts';
import { Grid, Container, Segment, Button, Menu, Icon } from 'semantic-ui-react'
import '../styles/NewPost.css';



export default class NewPost extends Component {
  state = {
    isEvent: false
  }

  render() {
    return (
      <div className="add-post">
        <Menu inverted color="blue" className="top-nav">
          <Menu.Item className="back"><button className="back" onClick={this.props.handleCancel}><Icon inverted name='arrow left' size='large' /></button></Menu.Item>
        </Menu>
        <div>
          <form onSubmit={this.props.handleNewPost}>
            <Segment className="form-segment">
              <Grid columns='equal'>
                <Grid.Row>
                  <Grid.Column>
                    <p>Title</p>
                    <input className="text" name="title" placeholder="Title" onChange={this.props.handleInput} />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column>
                    <p>Content</p>
                    <input className="text" name="content" placeholder="Content" onChange={this.props.handleInput} />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column>
                    <p>Platform</p>
                    <input className="text" name="platform" placeholder="platform" onChange={this.props.handleInput} />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column>
                    <label htmlFor="isEvent">Is this an event? Other players will be able to join.</label>
                    <input className="checkbox" type="checkbox" value="yes" name="isEvent" onChange={this.props.handleCheckbox} />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column>
                    <input className="submit-button" type="submit" value="Submit" name="submit" />
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Segment>
          </form>
        </div>
      </div>

    )
  }
}
