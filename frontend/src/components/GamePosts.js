import React, { Component } from 'react'

export default class GamePosts extends Component {
  render() {
    return (
      <div>
        <h1>Posts for {this.props.gameTitle}</h1>
      </div>
    )
  }
}
