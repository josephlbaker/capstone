import React, { Component } from 'react';
// import { Switch, Route, Redirect } from 'react-router-dom';

import axios from 'axios';

// import './App.css';
import SignUp from './SignUp';

class App extends Component {

  state = {
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    isLoggedIn: "",
    preference1: "",
    preference2: ""
  }

  componentDidMount() {
    if (localStorage.token) {
      axios({
        method: "get",
        url: `https://localhost:3000`,
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
    return (
      <div className="App">
        <SignUp
          handleInput={this.handleInput}
          handleSignUp={this.handleSignUp}
          isLoggedIn={this.state.isLoggedIn}
        />
      </div>
    );
  }
}

export default App;
