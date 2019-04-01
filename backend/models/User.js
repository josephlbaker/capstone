const mongoose = require("mongoose");

Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  avatar: {
    type: String
  },
  steamId: {
    type: String
  },
  xbGamertag: {
    type: String
  },
  psn: {
    type: String
  },
  originId: {
    type: String
  },
  preference1: {
    type: String
  },
  preference2: {
    type: String
  },
  preference3: {
    type: String
  },
  preference4: {
    type: String
  }
});

UserSchema.set("toJSON", {
  transform: function (doc, ret, opt) {
    delete ret["password"];
    return ret;
  }
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
