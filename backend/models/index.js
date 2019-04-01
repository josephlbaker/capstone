const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/capstone',
  { useNewUrlParser: true })

module.exports = {
  User: require("./user"),
  Post: require("./post"),
  // City: require("./City")
};
