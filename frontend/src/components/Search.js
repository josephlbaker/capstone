// import React, { Component } from 'react'
// import $ from 'jquery';


// export default class Search extends Component {

//   getGames = () => {
//     let key = "0c85bbb4508d433251a4fa6cbedbc3141ee1c1b0";
//     $('form').on('submit', function (e) {
//       e.preventDefault();
//       $('.game-gallery').empty();
//       let inputVal = $('.search-input').val();
//       let gameGallery = $('.game-gallery');
//       let url = `https://www.giantbomb.com/api/search/?api_key=${key}&query=${this.state.query}&limit=10&format=jsonp&resources=game`;

//       $.ajax({
//         method: 'GET',
//         url: url,
//         success: (res) => {
//           console.log(res);
//         },
//         dataType: 'jsonp',
//         jsonp: 'json_callback',
//         crossDomain: true
//       })
//     })
//   }

//   render() {
//     return (
//       <div className="search-container">
//         <form>
//           <input type="text" className="search-input"></input>
//         </form>
//         <div className="game-gallery"></div>
//       </div>
//     )
//   }
// }
