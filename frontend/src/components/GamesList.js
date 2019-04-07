import React, { Component } from 'react';
import $ from 'jquery';
import LogIn from './LogIn';
import SignUp from './SignUp';
import SearchBar from './SearchBar';

export default class GamesList extends Component {

  // componentDidUpdate() {
  //   console.log('update');
  //   $('.search').on('click', function (e) {
  //     e.preventDefault();
  //     $('.games-gallery').empty();
  //     let inputVal = $('.search-field').val();
  //     let gamesGallery = $('.games-gallery');
  //     let gameUrl = `https://www.giantbomb.com/api/search/?api_key=0c85bbb4508d433251a4fa6cbedbc3141ee1c1b0&format=jsonp&query=${inputVal}&limit=20&resources=game`
  //     $.ajax({
  //       method: 'GET',
  //       url: gameUrl,
  //       success: onSuccess,
  //       dataType: 'jsonp',
  //       jsonp: 'json_callback',
  //       crossDomain: true,
  //     })

  //     function onSuccess(response) {
  //       console.log(response);
  //       response.map(child => {
  //         let gameId = child.id;
  //         let img = $(`<img className="result-image" />`);
  //         let url = child.image;
  //         img.attr('src', url);
  //         gamesGallery.append(img);
  //         return gameId;
  //       });
  //     }
  //   })
  // }

  // componentDidMount() {
  //   $.ajax({
  //     method: 'GET',
  //     url: "https://www.giantbomb.com/api/games/?api_key=6e0060f42d81f489256e472989988c2b69e0eacc&limit10&format=jsonp&resources=game&sort=original_release_date:desc&limit=10",
  //     success: onSuccess,
  //     error: onError,
  //     dataType: 'jsonp',
  //     jsonp: 'json_callback',
  //     crossDomain: true,
  //   })

  //   function onSuccess(games) {
  //     console.log(games);
  //     let results = games.results;
  //     results.map(child => {
  //       let gameId = child.id;
  //       let img = $(`<img className="result-image" />`);
  //       let url = child.image.small_url;
  //       img.attr('src', url);
  //       $(".games-gallery").append(img);
  //       return gameId;
  //     });
  //   }

  //   function onError(error) { console.log(error) }
  // }

  render() {

    if (this.props.isLoggedIn) {
      return (
        <div>
          <SearchBar />
          {/* <form>
            <input className="search-field"></input>
            <button className="search">Search</button>
          </form> */}
          <div className="games-gallery"></div>
        </div>
      )
    } else {
      return (
        <div>
          <LogIn handleInput={this.props.handleInput}
            handleLogin={this.props.handleLogin} />
          <SignUp handleSignUp={this.props.handleSignUp}
            handleInput={this.props.handleInput} />
        </div>
      )
    }
  }
}

// working API
// https://www.giantbomb.com/api/games/?api_key=6e0060f42d81f489256e472989988c2b69e0eacc&format=jsonp&resources=game
