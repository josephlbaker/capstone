import React, { Component } from 'react';
import axios from 'axios';

import Nav from './Nav';
import Routes from './Routes';

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
        url: `http://localhost:3000`,
        headers: { authorization: `Bearer ${localStorage.token}` }
      })
        .then(response => {
          console.log('App successfully recieves a response')
          this.setState({
            isLoggedIn: true,
            user: response.data.user,
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
          username: res.data.user.username,
          redirect: true,
          userId: res.data.user._id
        });
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
        username: this.state.username,
        password: this.state.password,
        preference1: this.state.preference1,
        preference2: this.state.preference2
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
    console.log("IS LOGGED IN?", this.state.isLoggedIn);
    return (
      <div className="App">
        <div className="body">
          <Nav isLoggedIn={this.state.isLoggedIn} />
          <Routes handleInput={this.handleInput}
            handleLogin={this.handleLogin}
            handleSignUp={this.handleSignUp}
            handleLogOut={this.handleLogOut}
            isLoggedIn={this.state.isLoggedIn}
            profileId={this.state.profileId || null} />
        </div>
      </div>
    );
  }
}

export default App;
