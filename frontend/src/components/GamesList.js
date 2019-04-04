import React, { Component } from 'react';
import $ from 'jquery';

export default class GamesList extends Component {

  componentDidMount() {
    $.ajax({
      method: 'GET',
      url: "https://www.giantbomb.com/api/games/?api_key=6e0060f42d81f489256e472989988c2b69e0eacc&format=jsonp&resources=game",
      success: onSuccess,
      error: onError,
      dataType: 'jsonp',
      jsonp: 'json_callback',
      crossDomain: true,
    })

    function onSuccess(games) {
      let results = games.results;
      results.map(child => {
        let gameId = child.id;
        let img = $(`<img className="result-image" />`);
        let url = child.image.medium_url;
        img.attr('src', url);
        $(".games-gallery").append(img);
        return gameId;
      });
    }

    function onError(error) { console.log(error) }
  }

  render() {

    if (this.props.isLoggedIn) {
      return (
        <div>
          <div className="games-gallery"></div>
        </div>
      )
    } else {
      return (
        <h1>Landing</h1>
      )
    }
  }
}

