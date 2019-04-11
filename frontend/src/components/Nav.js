import React, { Component } from 'react'
import LogOut from './LogOut';
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
        <Menu>
          <Menu.Item onClick={this.handleClick.bind(this, 'games')} active={this.state.render === 'games'}><Icon name='gamepad' size='large' /></Menu.Item>
          <Menu.Item onClick={this.handleClick.bind(this, 'posts')} active={this.state.render === 'posts'}>Posts</Menu.Item>
          <Menu.Item onClick={this.handleClick.bind(this, 'profile')} active={this.state.render === 'profile'}>Profile</Menu.Item>
          <Menu.Item onClick={this.handleClick.bind(this, 'popular')} active={this.state.render === 'popular'}>Popular</Menu.Item>
        </Menu>
      </div>
    )
  }

  // gamepad

  //   if(this.props.isLoggedIn) {
  //     return (
  //       <div>
  //         <LogOut
  //           isLoggedIn={this.props.isLoggedIn}
  //           handleLogOut={this.props.handleLogOut} />
  //       </div>
  //     )
  //   } else {
  //   return (
  //     null
  //   )
  // }
  //   }
}
