import React, { Component } from 'react'

export default class Result extends Component {

  state = {
    resultId: ''
  }

  handleClick(result) {
    this.setState({
      resultId: result
    })
  }

  render() {
    if (this.props.results.length < 1) {
      return null;
    }

    const resultsMarkup = this.props.results.map((result, key) => {
      return (
        <div key={key}>
          <h2>Results:</h2>
          <p>Name: {result.name}</p>
          <img onClick={() => { this.handleClick(result.id) }} src={result.image.small_url} alt={`${result.name}`} />
        </div>
      )
    })
    return resultsMarkup;
  }
}
