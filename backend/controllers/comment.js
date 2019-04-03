const bcrypt = require("bcrypt");
const db = require("../models");
const jwt = require("jsonwebtoken");


module.exports = {
  index: (req, res) => {
    db.Post.find({})
      .populate("user")
      .exec((err, foundComments) => {
        console.log("HELLO user");
        if (err) return console.error(err);
        res.json(foundComments);
      });
  },
  createComment: (req, res) => {
    let newComment = new db.Comment({
      content: req.body.content,
      user: req.userId,
      timestamp: req.body.date,
      post: req.body.post
    });
    db.Comment.create(newComment, (err, newCommentCreated) => {
      if (err) return console.log(err);
      res.json(newCommentCreated);
    });
  },

  deleteComment: (req, res) => {
    let commentId = req.body._id;
    db.Comment.findOneAndDelete({ _id: commentId }, (err, foundComment) => {
      if (err) return console.log(err);
      console.log(foundComment);
      res.json(foundComment);
    });
  },
  updateComment: (req, res) => {
    let commentId = req.body._id;
    console.log(commentId);
    db.Post.findOneAndUpdate(
      { _id: commentId },
      req.body,
      { new: true },
      (err, updatedComment) => {
        if (err) return console.log(err);
        console.log(updatedComment);
        res.json(updatedComment);
      }
    );
  }
};
