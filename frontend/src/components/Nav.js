import React, { Component } from 'react'
import LogOut from './LogOut';
import GamesList from './GamesList';
import Post from './Post';
import Profile from './Profile';
import PopularGames from './PopularGames';

export default class Nav extends Component {

  state = {
    render: ''
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
        <ul>
          <li onClick={this.handleClick.bind(this, 'games')}>Games</li>
          <li onClick={this.handleClick.bind(this, 'posts')}>Posts</li>
          <li onClick={this.handleClick.bind(this, 'profile')}>My Profile</li>
          <li onClick={this.handleClick.bind(this, 'popular')}>Popular Games</li>
          <li><LogOut handleLogOut={this.props.handleLogOut} /></li>
        </ul>
        {this.renderSubComp()}
      </div>
    )
  }

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
