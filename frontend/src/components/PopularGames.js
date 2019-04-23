import React, { Component } from 'react'
import $ from 'jquery';
import { Menu, Segment } from 'semantic-ui-react'


import '../styles/PopularGames.css';

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
      url: `https://www.giantbomb.com/api/games/?api_key=${key}&limit=10&format=jsonp&resources=game&filter=id:46632|36765|52647|48190|66896|37030|72014|30475`,
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
        <div className="image-container" key={key}>
          {/* <p>Name: {result.name}</p> */}
          <Segment><img onClick={() => { this.handleClick(result) }} src={result.image.small_url} alt={`${result.name}`} /></Segment>
        </div>
      )
    })
    return (
      <div className="parent">
        <Menu inverted color="blue" className="top-nav">
          <Menu.Item><h3>Trending Games</h3></Menu.Item>
        </Menu>
        <div className="results-wrapper">
          {resultsMarkup}
        </div>
      </div>
    );
  }
}

// https://www.giantbomb.com/api/games/?api_key=${key}&limit=10&format=jsonp&resources=game&filter=name:The_Division_2%Overwatch
