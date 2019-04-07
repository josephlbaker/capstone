import React, { Component } from 'react';
import $ from 'jquery';

class Search extends Component {
  state = {
    query: '',
    results: []
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
    }, () => {
      if (this.state.query && this.state.query.length > 1) {
        if (this.state.query.length % 2 === 0) {
          this.getGames()
        }
      }
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();

    setInterval(() => {
      this.getGames()
    }, 2000);
  }

  render() {
    const results = this.state.results;
    const result = results.length > 0 && (
      results.map((result, key) => {
        return (
          <div key={key}>
            <h2>Results:</h2>
            <p>Name: {result.name}</p>
            <img src={result.image.small_url} alt={`${result.name}`} />
          </div>
        )
      })
    )
    console.log("Results: ", this.state.results)
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          placeholder="Search for..."
          ref={input => this.search = input}
          onChange={this.handleInputChange}
        />
        <p>{this.state.query}</p>
        <div className="results-container">
          {result}
        </div>
      </form>
    )
  }
}

export default Search
