const mongoose = require("mongoose");

Schema = mongoose.Schema;

const LikeSchema = new Schema({
  selectedUser: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  currentUser: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  Like: {
    type: Boolean,
    required: true
  }
});

module.exports = mongoose.model("Like", LikeSchema);
