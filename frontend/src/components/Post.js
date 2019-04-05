import React, { Component } from 'react'
import axios from 'axios';

export default class Post extends Component {

  render() {
    console.log(this.props.user);

    return (
      <div></div>
    )
  }

  // state = {
  //   posts: []
  // }

  // componentDidMount() {
  //   axios.get(`http://localhost:3001/posts`)
  //     .then((res) => {
  //       // filter the response and only add posts matching the cityId, which we get from above.
  //       const posts = [];
  //       res.data.filter(ele => {
  //         const userId = ele.user ? ele.user._id : '';
  //         return userId === this.props.user._id;
  //       }).map((ele) => {
  //         return posts.push(ele);
  //       })

  //       this.setState({
  //         posts
  //       })
  //     })
  //     .catch(err => {
  //       console.log('Error displaying for posts when you load the profile', err);
  //     });
  // };

  // render() {
  //   let postComponents = this.state.posts ? this.state.posts.map((post, index) => {
  //     console.log(this.props.user);
  //     return (
  //       <Post
  //         post={post} key={index}
  //       />
  //     )
  //   }) : <p>Posts not found</p>;

  //   return (
  //     <div>
  //       <div className="myPosts">
  //         {postComponents}
  //       </div>

  //       <form>
  //         <input name="title" placeholder="Title" onChange={this.props.handleInput} />
  //         <input name="content" placeholder="Content" onChange={this.props.handleInput} />
  //         <input name="timestamp" placeholder="Current Time" onChange={this.props.handleInput} />
  //         <input name="gameTitle" placeholder="Game" onChange={this.props.handleInput} />
  //         <input name="platform" placeholder="platform" onChange={this.props.handleInput} />
  //         <button name="submit" onClick={this.props.handleNewPost}>Submit</button>
  //       </form>
  //     </div>
  //   )
  // }
}
