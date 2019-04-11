import React, { Component } from 'react';
import $ from 'jquery';
import LogIn from './LogIn';
import SignUp from './SignUp';
import SearchBar from './SearchBar';

export default class GamesList extends Component {

  state = {
    render: ''
  }

  handleClick(compName, e) {
    this.setState({ render: compName });
  }

  renderSubComp() {
    switch (this.state.render) {
      case 'login': return <LogIn handleInput={this.props.handleInput}
        handleLogin={this.props.handleLogin} />
      case 'signup': return <SignUp handleSignUp={this.props.handleSignUp}
        handleInput={this.props.handleInput} />
    }
  }

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
          <button onClick={this.handleClick.bind(this, 'login')}>Login</button>
          <button onClick={this.handleClick.bind(this, 'signup')}>Signup</button>
          {this.renderSubComp()}
        </div>
      )
    }
  }
}

// working API
// https://www.giantbomb.com/api/games/?api_key=6e0060f42d81f489256e472989988c2b69e0eacc&format=jsonp&resources=game
