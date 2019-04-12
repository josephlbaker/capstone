import React, { Component } from 'react'
import axios from 'axios';
import { Container, Segment, Icon, Menu } from 'semantic-ui-react'


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
      let user = this.props.user.username
      this.state.post.players.push(user)
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
        <div>
          <Menu inverted color="blue" className="top-nav">
            <Menu.Item className="back"><button onClick={this.props.handleGoBack}><Icon inverted name='arrow left' size='large' /></button></Menu.Item>
          </Menu>
          {this.state.post.title}
          {this.state.post.gameTitle}
          {this.state.post.content}
          {this.state.post.platform}
          {this.state.post.players}
          <button name="editPost" onClick={this.handleClick}>Edit</button>
          <CommentList user={this.props.user}
            post={this.state.post} />
        </div>
      )
    }
    if (this.state.post.isEvent) {
      return (
        <div>
          <Menu inverted color="blue" className="top-nav">
            <Menu.Item className="back"><button onClick={this.props.handleGoBack}><Icon inverted name='arrow left' size='large' /></button></Menu.Item>

          </Menu>
          {this.state.post.title}
          {this.state.post.gameTitle}
          {this.state.post.content}
          {this.state.post.platform}
          <h1>Players participating</h1>
          {this.state.post.players}
          <button name="joinEvent" onClick={this.handleJoin}>Join Event</button>
          <CommentList user={this.props.user}
            post={this.state.post} />
        </div>
      )
    }
    return (
      <div>
        <Menu inverted color="blue" className="top-nav">
          <Menu.Item className="back"><button onClick={this.props.handleGoBack}><Icon inverted name='arrow left' size='large' /></button></Menu.Item>
        </Menu>
        {this.state.post.title}
        {this.state.post.gameTitle}
        {this.state.post.content}
        {this.state.post.platform}
        {this.state.post.players}
        <CommentList user={this.props.user}
          post={this.state.post} />
      </div>
    )
  }
}
