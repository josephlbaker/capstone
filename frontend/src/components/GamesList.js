import React, { Component } from 'react';
import $ from 'jquery';
import { Button, Grid, Container, Image, Menu } from 'semantic-ui-react'
import '../styles/GamesList.css';


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
        <div className="search-container">
          <SearchBar
            user={this.props.user}
          />
          <div className="games-gallery"></div>
          {/* <p>Search thousands of game titles...</p> */}
        </div>
      )
    } else {
      return (
        <div className="registration-buttons">
          <div className="image-wrapper">
          </div>
          {this.renderSubComp()}
          <Container>
            <Grid>
              <Grid.Column textAlign="center">
                <Button className="" onClick={this.handleClick.bind(this, 'login')}>Login</Button>
                <Button primary className="" onClick={this.handleClick.bind(this, 'signup')}>Signup</Button>
              </Grid.Column>
            </Grid>
          </Container>
        </div>
      )
    }
  }
}
