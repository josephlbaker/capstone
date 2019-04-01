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
  gameTitle: {
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
  event: {
    type: Schema.Types.ObjectId,
    ref: "Event"
  }
});

module.exports = mongoose.model("Post", PostSchema);
