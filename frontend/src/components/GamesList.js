import React, { Component } from 'react';
import $ from 'jquery';
import LogIn from './LogIn';
import SignUp from './SignUp';
import SearchBar from './SearchBar';

export default class GamesList extends Component {

  render() {

    if (this.props.isLoggedIn) {
      return (
        <div>
          <SearchBar
            user={this.props.user}
          />
          <div className="games-gallery"></div>
        </div>
      )
    } else {
      return (
        <div>
          <LogIn handleInput={this.props.handleInput}
            handleLogin={this.props.handleLogin} />
          <SignUp handleSignUp={this.props.handleSignUp}
            handleInput={this.props.handleInput} />
        </div>
      )
    }
  }
}

// working API
// https://www.giantbomb.com/api/games/?api_key=6e0060f42d81f489256e472989988c2b69e0eacc&format=jsonp&resources=game
