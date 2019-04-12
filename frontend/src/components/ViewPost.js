import React, { Component } from 'react'
import axios from 'axios';
import { Container, Segment, Icon, Menu } from 'semantic-ui-react'
import '../styles/ViewPost.css';

import EditPost from './EditPost';
import CommentList from './CommentList';
import AddComment from './AddComment';

export default class ViewPost extends Component {

  state = {
    post: {},
    edit: '',
    gamePosts: false,
    myPosts: false
  }

  fetchPost = () => {
    fetch(`http://localhost:3001/posts/${this.props.postId}`, {
      method: 'GET'
    })
      .then(results => results.json())
      .then(data => this.setState({ post: data }))
  }

  componentDidMount() {
    this.fetchPost();
  }

  returnToGamePosts = (e) => {
    e.preventDefault();
    this.props.handleNewPostSubmit();
  }

  handleClick = () => {
    this.setState({
      edit: true
    })
  }

  handleBackToPosts = () => {
    this.setState({
      edit: false
    })
  }

  handleJoin = (event) => {
    event.preventDefault();
    if (!this.state.post.players.includes(this.props.user.username)) {
      let currentUser = this.props.user.username
      this.state.post.players.push(currentUser)
      axios
        .put(`http://localhost:3001/posts/${this.state.post._id}/updatepost`, {
          players: this.state.post.players
        })
        .then(res => {
          console.log(res);
          this.fetchPost();
        })
        .catch(err => {
          console.log("Error");
        })
    }
  }

  render() {
    if (this.state.edit === true) {
      return (
        <div>
          <EditPost
            handleGoBack={this.props.handleGoBack}
            handleBackToPosts={this.handleBackToPosts}
            post={this.state.post} />
        </div>
      )
    }

    if (this.props.user._id === this.state.post.user) {
      return (
        <div class="parent-container">
          <Menu inverted color="blue" className="top-nav">
            <Menu.Item className="back"><button onClick={this.props.handleGoBack}><Icon inverted name='arrow left' size='large' /></button></Menu.Item>
          </Menu>
          <Container>
            <Segment>
              <h3>{this.state.post.title}</h3><p> - {this.props.username}</p>
              <br />
              <p className="game-title">{this.state.post.gameTitle} on {this.state.post.platform}</p>
              <br />
              <p className="content">{this.state.post.content}</p>
              <br />
              <p className="players">Players participating: {this.state.post.players}</p>
              <button name="editPost" onClick={this.handleClick}>Edit</button>
            </Segment>
            <CommentList user={this.props.user}
              post={this.state.post} />
          </Container>
        </div>
      )
    }
    if (this.state.post.isEvent) {
      return (
        <div class="parent-container">
          <Menu inverted color="blue" className="top-nav">
            <Menu.Item className="back"><button onClick={this.props.handleGoBack}><Icon inverted name='arrow left' size='large' /></button></Menu.Item>
          </Menu>
          <Container>
            <Segment>
              <h3>{this.state.post.title}</h3><p> - {this.props.username}</p>
              <br />
              <p className="game-title">{this.state.post.gameTitle} on {this.state.post.platform}</p>
              <br />
              <p className="content">{this.state.post.content}</p>
              <br />
              <p className="players">Players participating: {this.state.post.players}</p>
              <button name="joinEvent" onClick={this.handleJoin}>Join Event</button>
            </Segment>
            <CommentList user={this.props.user}
              post={this.state.post} />
          </Container>
        </div>
      )
    }
    return (
      <div class="parent-container">
        <Menu inverted color="blue" className="top-nav">
          <Menu.Item className="back"><button onClick={this.props.handleGoBack}><Icon inverted name='arrow left' size='large' /></button></Menu.Item>
        </Menu>
        <Container>
          <Segment>
            <h3>{this.state.post.title}</h3><p> - {this.props.username}</p>
            <br />
            <p className="game-title">{this.state.post.gameTitle} on {this.state.post.platform}</p>
            <br />
            <p className="content">{this.state.post.content}</p>
            <br />
            <p className="players">Players participating: {this.state.post.players}</p>
          </Segment>
          <CommentList user={this.props.user}
            post={this.state.post} />
        </Container>
      </div>
    )
  }
}
