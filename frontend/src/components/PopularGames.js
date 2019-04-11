import React, { Component } from 'react'
import $ from 'jquery';

import GamePosts from './GamePosts';

export default class PopularGames extends Component {
  state = {
    gameId: '',
    gameTitle: '',
    results: []
  }

  handleGoBack = () => {
    this.setState({
      gameTitle: ''
    })
  }

  handleClick(result) {
    this.setState({
      gameId: result.id,
      gameTitle: result.name
    })
  }

  componentDidMount() {
    let key = "0c85bbb4508d433251a4fa6cbedbc3141ee1c1b0";
    $.ajax({
      method: 'GET',
      url: `https://www.giantbomb.com/api/games/?api_key=${key}&limit=10&format=jsonp&resources=game&filter=id:42905|48190`,
      success: (res) => {
        console.log(res);
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

  render() {
    if (this.state.results.length < 1) {
      return null;
    }

    if (this.state.gameTitle) {
      return (
        <GamePosts
          handleGoBack={this.handleGoBack}
          user={this.props.user}
          gameId={this.state.gameId}
          gameTitle={this.state.gameTitle}
        />
      )
    }

    const resultsMarkup = this.state.results.map((result, key) => {
      return (
        <div key={key}>
          <p>Name: {result.name}</p>
          <img onClick={() => { this.handleClick(result) }} src={result.image.small_url} alt={`${result.name}`} />
        </div>
      )
    })
    return resultsMarkup;
  }
}

// https://www.giantbomb.com/api/games/?api_key=${key}&limit=10&format=jsonp&resources=game&filter=name:The_Division_2%Overwatch
