const mongoose = require("mongoose");

Schema = mongoose.Schema;

const EventSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  players: [UserSchema],
  post: {
    type: Schema.Types.ObjectId,
    ref: "Post"
  }
});

module.exports = mongoose.model("Event", EventSchema);
