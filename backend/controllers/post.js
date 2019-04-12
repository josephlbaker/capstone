const db = require("../models");

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
      timestamp: req.body.date,
      // username: req.userId,
      gameId: req.body.gameId,
      gameTitle: req.body.gameTitle,
      platform: req.body.platform,
      user: req.body.user,
      players: req.body.players,
      isEvent: req.body.isEvent
    });

    db.Post.create(newPost, (err, newPostCreated) => {
      if (err) return console.log(err);
      newPostCreated.populate('user', () => {
        res.json(newPostCreated);
      })
    });
  },

  deletePost: (req, res) => {
    let postId = req.params.id;
    db.Post.findOneAndDelete({ _id: postId }, (err, foundPost) => {
      if (err) return console.log(err);
      console.log(foundPost);
      res.json(foundPost);
    });
  },

  getOnePost: (req, res) => {
    let postId = req.params.id;
    db.Post.findOne({ _id: postId }, (err, foundPost) => {
      if (err) return console.log(err);
      console.log(foundPost);
      res.json(foundPost);
    });
  },

  updatePost: (req, res) => {
    let postId = req.params.id;
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
