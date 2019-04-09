import React, { Component } from 'react'
import $ from 'jquery';

export default class PopularGames extends Component {
  state = {
    results: []
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
    return (
      <div>
        <h1>Hello</h1>
      </div>
    )
  }
}

// https://www.giantbomb.com/api/games/?api_key=${key}&limit=10&format=jsonp&resources=game&filter=name:The_Division_2%Overwatch
