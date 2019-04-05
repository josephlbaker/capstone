import React, { Component } from 'react';
import axios from 'axios';

import Nav from './Nav';
import GamesList from './GamesList';

class App extends Component {

  state = {
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    isLoggedIn: "",
    preference1: "",
    preference2: "",
    title: "",
    content: "",
    timestamp: "",
    gameTitle: "",
    platform: "",
    userId: "",
    user: "",
    profileId: ""
  }

  componentDidMount() {
    if (localStorage.token) {
      axios({
        method: "get",
        url: `http://localhost:3001/users/`,
        headers: { authorization: `Bearer ${localStorage.token}` }
      })
        .then(response => {
          console.log(response.data.user)
          console.log('App successfully recieves a response')
          this.setState({
            isLoggedIn: true,
            user: response.data.user
          });
        })
        .catch(() => {
          this.setState({
            isLoggedIn: false
          });
          localStorage.clear();
        });
    } else {
      this.setState({
        isLoggedIn: false
      });
    }
  }

  handleInput = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleLogin = event => {
    event.preventDefault();
    axios
      .post("http://localhost:3001/users/login", {
        email: this.state.email,
        password: this.state.password
      })
      .then(res => {
        localStorage.token = res.data.signedJwt;
        this.setState({
          isLoggedIn: true,
          // username: res.data.user.username,
          redirect: true,
          // userId: res.data.user._id,
          user: res.data.user
        });
        console.log(this.state.user);
      })
      .catch(err => console.log(err));
  };

  handleLogOut = () => {
    this.setState({
      email: "",
      password: "",
      isLoggedIn: false
    });
    localStorage.clear();
    window.location.href = "/"
  };

  handleNewPost = event => {
    event.preventDefault();
    axios
      .post("http://localhost:3001/posts/createpost", {
        title: this.state.title,
        content: this.state.content,
        username: this.state.username,
        user: this.state.userId,
        timestamp: this.state.timestamp,
        gameTitle: this.state.gameTitle,
        platform: this.state.platform
      })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log("Error");
      })
  };

  handleSignUp = event => {
    event.preventDefault();
    axios
      .post("http://localhost:3001/users/signup", {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        redirect: true,
        username: this.state.username,
        password: this.state.password
      })
      .then(response => {
        localStorage.token = response.data.signedJwt;

        this.setState({
          isLoggedIn: true,
          user: response.data.user
        });
      })
      .catch(err => console.log(err));
  };

  render() {
    if (this.state.isLoggedIn) {
      return (
        <div>
          <Nav
            handleLogOut={this.handleLogOut}
            isLoggedIn={this.state.isLoggedIn}
            user={this.state.user} />
        </div>
      )
    } else {
      return (
        <div className="App">
          <GamesList
            isLoggedIn={this.state.isLoggedIn}
            user={this.state.user}
            handleInput={this.handleInput}
            handleLogin={this.handleLogin}
            handleSignUp={this.handleSignUp} />
        </div>
      )
    }
  }
}

export default App;
