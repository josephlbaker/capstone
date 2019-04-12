import React, { Component } from 'react'
import '../styles/Result.css';

import GamePosts from './GamePosts';

export default class Result extends Component {

  state = {
    gameId: '',
    gameTitle: ''
  }

  handleClick(result) {
    this.setState({
      gameId: result.id,
      gameTitle: result.name
    })
  }

  render() {
    if (this.props.results.length < 1) {
      return null;
    }

    if (this.state.gameTitle) {
      return (
        <GamePosts
          user={this.props.user}
          gameId={this.state.gameId}
          gameTitle={this.state.gameTitle}
        />
      )
    }

    const resultsMarkup = this.props.results.map((result, key) => {
      return (
        <div className="image-container" key={key}>
          {/* <h2>Results:</h2>
          <p>Name: {result.name}</p> */}
          <img onClick={() => { this.handleClick(result) }} src={result.image.small_url} alt={`${result.name}`} />
        </div>
      )
    })
    return resultsMarkup;
  }
}
