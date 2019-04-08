import React, { Component } from 'react';
import $ from 'jquery';

import Result from './Result';

class SearchBar extends Component {
  state = {
    query: '',
    results: [],
    resultId: ''
  }

  getGames = () => {
    let key = "0c85bbb4508d433251a4fa6cbedbc3141ee1c1b0";
    $.ajax({
      method: 'GET',
      url: `https://www.giantbomb.com/api/search/?api_key=${key}&query=${this.state.query}&limit=10&format=jsonp&resources=game`,
      success: (res) => {
        if (res && res.results && res.results.length > 0) {
          this.setState({
            results: res.results
          })
        }
      },
      error: (err) => {
        console.log("Error, Message: ", err);
      },
      dataType: 'jsonp',
      jsonp: 'json_callback',
      crossDomain: true
    })
  }

  handleInputChange = (e) => {
    this.setState({
      query: this.search.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();

    this.getGames()
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          placeholder="Search for..."
          ref={input => this.search = input}
          onChange={this.handleInputChange}
        />
        <p>{this.state.query}</p>
        <div className="results-container">
          <Result
            user={this.props.user}
            results={this.state.results}
          />
        </div>
      </form>
    )
  }
}

export default SearchBar
