import React, { Component } from 'react'
import axios from 'axios';
import jsonpAdapter from 'axios-jsonp';

export default class GamesList extends Component {

  componentDidMount() {
    let games = function (json) {
      console.log(json)
    }
    games('test')
    axios({
      adapter: jsonpAdapter,
      url: "https://www.giantbomb.com/api/games/?api_key=0c85bbb4508d433251a4fa6cbedbc3141ee1c1b0&format=jsonp&json_callback=games",
    }).then(response => {
      console.log(response)
    })


  }

  render() {

    return (
      <div>

      </div>
    )
  }
}

