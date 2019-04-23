import React, { Component } from 'react'
import GamesList from './GamesList';
import Post from './Post';
import Profile from './Profile';
import PopularGames from './PopularGames';

import '../styles/Nav.css';
import { Menu, Icon } from 'semantic-ui-react'

export default class Nav extends Component {

  state = {
    render: 'popular'
  }

  handleClick(compName, e) {
    this.setState({ render: compName });
  }

  renderSubComp() {
    switch (this.state.render) {
      case 'games': return <GamesList
        isLoggedIn={this.props.isLoggedIn}
        user={this.props.user}
      />
      case 'posts': return <Post
        title={this.props.title}
        content={this.props.content}
        platform={this.props.platform}
        handleInput={this.props.handleInput}
        handleNewPost={this.props.handleNewPost}
        isLoggedIn={this.props.isLoggedIn}
        user={this.props.user}
      />
      case 'profile': return <Profile
        user={this.props.user}
      />
      case 'popular': return <PopularGames
        user={this.props.user}
      />
      // default: return null
    }
  }

  render() {
    return (
      <div className="nav-components">
        {this.renderSubComp()}
        <Menu className="main-nav-container" inverted color='blue'>
          <Menu.Item onClick={this.handleClick.bind(this, 'games')} active={this.state.render === 'games'}><Icon name='search' size='large' /></Menu.Item>
          <Menu.Item onClick={this.handleClick.bind(this, 'popular')} active={this.state.render === 'popular'}><Icon name='gamepad' size='large' /></Menu.Item>
          <Menu.Item onClick={this.handleClick.bind(this, 'posts')} active={this.state.render === 'posts'}><Icon name='newspaper outline' size='large' /></Menu.Item>
          <Menu.Item onClick={this.handleClick.bind(this, 'profile')} active={this.state.render === 'profile'}><Icon name='user' size='large' /></Menu.Item>
        </Menu>
      </div>
    )
  }
}
