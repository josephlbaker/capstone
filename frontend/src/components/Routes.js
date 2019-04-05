import React, { Component } from 'react'
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import SignUp from './SignUp';
import Post from './Post';
import LogIn from './LogIn';
import GamesList from './GamesList';

export default class Routes extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route
            exact path="/"
            render={() => {
              return <GamesList
                user={this.props.user}
                isLoggedIn={this.props.isLoggedIn} />
            }}
          />
          <Route
            exact path="/login"
            render={() => {
              return <LogIn
                user={this.props.user}
                handleInput={this.props.handleInput}
                handleLogin={this.props.handleLogin} />
            }}
          />
          <Route
            exact path="/signup"
            render={() => {
              return <SignUp
                user={this.props.user}
                handleInput={this.props.handleInput}
                handleSignUp={this.props.handleSignUp} />
            }}
          />

          <Route
            exact path="/posts"
            render={() => {
              console.log(this.props.user);
              return <Post
                user={this.props.user}
                isLoggedIn={this.props.isLoggedIn} />
            }}
          />

        </Switch>
      </BrowserRouter>
    )
  }
}
