import React, { Component } from 'react'
import axios from 'axios'
import { Segment, Container, Menu, Icon, Grid, Button } from 'semantic-ui-react'
import '../styles/EditPost.css';


export default class EditPost extends Component {

  state = {
    title: this.props.post.title,
    content: this.props.post.content,
    platform: this.props.post.platform,
    gameId: this.props.post.gameId,
    gameTitle: this.props.post.gameTitle,
    isEvent: this.props.post.isEvent,
    players: this.props.post.players
  }

  handleCheckbox = event => {
    if (this.state.isEvent === false || this.state.isEvent === 'off') {
      this.setState({
        isEvent: true
      })
    }
    if (this.state.isEvent === true || this.state.isEvent === 'on') {
      this.setState({
        isEvent: false
      })
    }
  }

  handleInput = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleEditPost = event => {
    event.preventDefault();
    axios
      .put(`http://localhost:3001/posts/${this.props.post._id}/updatepost`, {
        title: this.state.title,
        content: this.state.content,
        platform: this.state.platform,
        gameId: this.state.gameId,
        gameTitle: this.state.gameTitle,
        isEvent: this.state.isEvent,
        players: this.state.players
      })
      .then(res => {
        console.log(res);
        this.props.handleGoBack();
      })
      .catch(err => {
        console.log("Error");
      })
  };

  handleDeletePost = event => {
    axios
      .delete(`http://localhost:3001/posts/${this.props.post._id}/deletepost`)
      .then(res => {
        console.log(res);
        this.props.handleGoBack();
      })
      .catch(err => {
        console.log("Error");
      })
  }

  render() {
    return (
      <div className="edit-posts">
        <Menu inverted color="blue" className="top-nav">
          <Menu.Item className="back"><button className="back" onClick={this.props.handleBackToPosts}><Icon inverted name='arrow left' size='large' /></button></Menu.Item>
        </Menu>
        <div>
          <form>
            <Segment className="form-segment">
              <Grid columns='equal'>
                <Grid.Row>
                  <Grid.Column>
                    <p>Title</p>
                    <input name="title" placeholder={this.state.title} onChange={this.handleInput} />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column>
                    <p>Content</p>
                    <input name="content" placeholder={this.state.content} onChange={this.handleInput} />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column>
                    <p>Platform</p>
                    <input name="platform" placeholder={this.state.platform} onChange={this.handleInput} />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column>
                    <label htmlFor="isEvent">Is this an event?</label>
                    <input type="checkbox" name="isEvent" onChange={this.handleCheckbox} />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column>
                    <Button fluid primary name="submit" onClick={this.handleEditPost}>Submit</Button>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column>
                    <Button fluid name="delete" onClick={this.handleDeletePost}>Delete Post</Button>
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
