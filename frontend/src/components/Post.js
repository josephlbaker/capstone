import React, { Component } from 'react'
import axios from 'axios';
import MyPosts from './MyPosts';

export default class Post extends Component {

  // render() {
  //   console.log(this.props.user);
  //   return (
  //     <div>Hello</div>
  //   )
  // }

  state = {
    posts: []
  }

  componentDidMount() {
    fetch("http://localhost:3001/posts", {
      method: "GET"
    })
      .then(results => results.json())
      .then(data => this.setState({ posts: data }))
      .catch(function (error) { console.log(error) });
  }

  _renderPosts = (post, index) => {
    if (post.user.username === this.props.user.username) {
      return <li key={index}>{post.title} - {post.content} - {post.user.username}</li>
    } else {
      return null;
    }
  }



  // db.findUser
  // store user in foundUser
  // search within post and filter by foundUser id
  // return json(foundUsers)



  render() {
    const { posts } = this.state;

    return (
      <div>
        <h1>Posts</h1>
        <ul>
          {
            posts ?
              posts.map(this._renderPosts)
              :
              "No posts for this game"
          }
        </ul>
      </div>
    );
  }


  // componentDidMount() {
  //   axios.get(`http://localhost:3001/posts`)
  //     .then((res) => {
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
  //       <MyPosts
  //         post={post} key={index}
  //       />
  //     )
  //   }) : <p>Posts not found</p>;

  // return (
  // <div>
  //   <div className="myPosts">
  //     {postComponents}
  //   </div>

  // </div>
  //     )
  //   }
}
