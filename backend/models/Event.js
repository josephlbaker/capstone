const mongoose = require("mongoose");

Schema = mongoose.Schema;

const EventSchema = new Schema({

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
  },
  players: [{
    type: Schema.Types.ObjectId,
    ref: "User"
  }],
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  post: {
    type: Schema.Types.ObjectId,
    ref: "Post"
  }
});

module.exports = mongoose.model("Event", EventSchema);
