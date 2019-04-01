const bcrypt = require("bcrypt");
const db = require("../models");
const jwt = require("jsonwebtoken");


module.exports = {
  index: (req, res) => {
    db.Post.find({})
      .populate("user")
      .exec((err, foundPosts) => {
        console.log("HELLO user");
        if (err) return console.error(err);
        res.json(foundPosts);
      });
  },
  createPost: (req, res) => {
    let newPost = new db.Post({
      title: req.body.title,
      content: req.body.content,
      timestamp: req.body.timestamp,
      username: req.userId,
      gameTitle: req.body.gameTitle,
      platform: req.body.platform
    });
    db.Post.create(newPost, (err, newPostCreated) => {
      if (err) return console.log(err);
      res.json(newPostCreated);
    });
  },

  deletePost: (req, res) => {
    let postId = req.body._id;
    db.Post.findOneAndDelete({ _id: postId }, (err, foundPost) => {
      if (err) return console.log(err);
      console.log(foundPost);
      res.json(foundPost);
    });
  },
  updatePost: (req, res) => {
    let postId = req.body._id;
    console.log(postId);
    db.Post.findOneAndUpdate(
      { _id: postId },
      req.body,
      { new: true },
      (err, updatedPost) => {
        if (err) return console.log(err);
        console.log(updatedPost);
        res.json(updatedPost);
      }
    );
  }
};