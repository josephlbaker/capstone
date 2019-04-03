const mongoose = require("mongoose");

Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  timestamp: {
    type: String,
    required: true
  },
  platform: {
    type: String,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  username: {
    type: String
  },
  game: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Post", PostSchema);
// need embedded data
// user:[User.Schema]
