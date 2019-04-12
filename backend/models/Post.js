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
    type: Date,
    default: Date.now(),
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
  gameId: {
    type: String,
    required: true
  },
  gameTitle: {
    type: String,
    required: true
  },
  players: [String],
  isEvent: Boolean
});

module.exports = mongoose.model("Post", PostSchema);
