const mongoose = require('mongoose');

// mongoose.Promise = Promise

mongoose.connect('mongodb://localhost/capstone',
  { useNewUrlParser: true })

module.exports = {
  User: require("./user"),
  Post: require("./post"),
  Event: require("./event"),
  Comment: require("./comment"),
  Like: require("./like")
};
